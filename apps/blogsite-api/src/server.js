require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const pino = require('pino');
// const pinoPretty = require('pino-pretty');

// Import middleware and routes
const logger = require('./middleware/logger');
const health = require('./routes/health');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const quiz = require('./routes/quiz');
const { connect } = require('./db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const openapiPath = path.join(__dirname, '..', 'openapi.yaml');
let swaggerDoc;
try { swaggerDoc = YAML.load(openapiPath); } catch { swaggerDoc = null; }

const app = express();

// Logger setup
const log = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  } : undefined
});

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// CORS configuration - Restrict to local dev origins by default
const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:3006')
  .split(',')
  .map(s => s.trim());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('CORS blocked'));
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom logger middleware
app.use(logger);

// Optional Mongo connection for local dev
if (process.env.MONGO_URI) {
  connect(process.env.MONGO_URI)
    .then(() => log.info('Mongo connected'))
    .catch((e) => log.warn('Mongo not connected (optional):', e.message));
}

// Routes
app.use('/api', health);
app.use('/api/auth', auth);
app.use('/api', posts);
app.use('/api', quiz);

// Swagger UI
if (swaggerDoc) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
}

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, _next) => {
  log.error('Unhandled error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  log.info('SIGTERM received, shutting down gracefully');
  await mongoose.connection.close();
  log.info('MongoDB connection closed');
  process.exit(0);
});

process.on('SIGINT', async () => {
  log.info('SIGINT received, shutting down gracefully');
  await mongoose.connection.close();
  log.info('MongoDB connection closed');
  process.exit(0);
});

const PORT = process.env.PORT || 4001;
console.log(`blogsite-api starting...`);
app.listen(PORT, () => console.log(`blogsite-api listening on :${PORT}`));
