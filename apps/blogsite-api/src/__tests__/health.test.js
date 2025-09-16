const request = require('supertest');
const express = require('express');
const health = require('../routes/health');

const app = express();
app.use('/api', health);

describe('Health Endpoint', () => {
  test('GET /api/health should return 200 with status ok', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('ts');
    expect(new Date(response.body.ts)).toBeInstanceOf(Date);
  });
});


