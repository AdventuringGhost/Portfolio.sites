# Blogsite API

A RESTful API service for managing blog posts, comments, and user authentication.

## Tech Stack

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Security**: Helmet, CORS, Rate limiting
- **Logging**: Pino with pretty printing in development

## Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Update .env with your configuration
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A strong secret for JWT signing
# - PORT: Server port (default: 4001)
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Start server with documentation info
npm run start:docs

# Run tests
npm test

# Run linting
npm run lint
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4001` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/blogsite` |
| `JWT_SECRET` | JWT signing secret | Required |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:5173,http://localhost:3006` |
| `MONGO_URI`, `MONGO_DB` | optional local persistence for quiz results | - |
| `LOG_LEVEL` | Logging level | `info` |

## API Endpoints

### Documentation
- `GET /api/docs` - Interactive API documentation (Swagger UI)

### Health Check
- `GET /api/health` - Returns server status and timestamp

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)

### Comments
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add comment to post
- `PUT /api/comments/:id` - Update comment (authenticated)
- `DELETE /api/comments/:id` - Delete comment (authenticated)

### Quiz
- `POST /api/quiz-results` - Submit quiz results (from Glow & Grove quiz)
  - **201** returns `{ ok, quiz_result_id, createdAt }`
  - If `MONGO_URI` is set, submissions are also persisted to Mongo (local dev).
- `GET /api/quiz-results` - **dev-only** viewer to inspect recent submissions (no auth)

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP (general), 30 quiz submissions per 15 minutes per IP
- **CORS**: Configurable origins for cross-origin requests
- **Helmet**: Security headers
- **JWT**: Short-lived tokens with refresh mechanism
- **Password Hashing**: bcrypt with salt rounds
- **Schema Validation**: Zod-based input validation for all endpoints

## API Documentation

The API includes interactive documentation powered by Swagger UI:

- **Swagger UI**: `http://localhost:4001/api/docs`
- **OpenAPI Spec**: `openapi.yaml` (OpenAPI 3.0.3 format)

The documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Interactive testing interface

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- health.test.js
```

## Deployment

### Docker

```bash
# Build image
docker build -t blogsite-api .

# Run container
docker run -p 4001:4001 --env-file .env blogsite-api
```

### Environment Setup

1. Set up MongoDB instance (Atlas, local, or container)
2. Configure environment variables
3. Run database migrations if needed
4. Start the application

### Production Considerations

- Use environment-specific JWT secrets
- Configure proper CORS origins
- Set up monitoring and logging
- Use HTTPS in production
- Configure proper rate limiting
- Set up database backups
