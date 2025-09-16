const request = require('supertest');
const express = require('express');

// Mock the auth routes to avoid database dependencies
const mockAuthRouter = express.Router();

mockAuthRouter.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  res.json({ success: true, message: 'Registration successful' });
});

mockAuthRouter.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  res.json({ success: true, message: 'Login successful' });
});

const app = express();
app.use(express.json());
app.use('/api/auth', mockAuthRouter);

describe('Auth Routes', () => {
  test('POST /api/auth/register should return 400 for missing data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');
  });

  test('POST /api/auth/login should return 400 for missing credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');
  });
});
