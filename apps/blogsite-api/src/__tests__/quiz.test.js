const request = require('supertest');
const express = require('express');
const quizRoute = require('../routes/quiz');

describe('POST /api/quiz-results', () => {
  const app = express();
  app.use(express.json());
  app.use('/api', quizRoute);

  it('returns 201 for valid payload', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: ['Outdoorsy', '$$', 'Eco-friendly'], 
        result: { title: 'Trail-Ready', items: ['Eco-friendly mugs'] }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('ok', true);
    expect(res.body).toHaveProperty('quiz_result_id');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('returns 400 for invalid payload', async () => {
    const res = await request(app).post('/api/quiz-results').send({});
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for missing answers array', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        result: { title: 'Test', items: ['item1'] }
      });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for missing result object', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: ['answer1', 'answer2']
      });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for result without items array', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: ['answer1', 'answer2'],
        result: { title: 'Test' }
      });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for empty answers array', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: [],
        result: { title: 'Test', items: ['item1'] }
      });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for too many answers', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: Array(11).fill('answer'),
        result: { title: 'Test', items: ['item1'] }
      });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for empty result title', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: ['answer1'],
        result: { title: '', items: ['item1'] }
      });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 for too many result items', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: ['answer1'],
        result: { title: 'Test', items: Array(11).fill('item') }
      });
    expect(res.statusCode).toBe(400);
  });

  it('includes validation issues in error response', async () => {
    const res = await request(app)
      .post('/api/quiz-results')
      .send({ 
        answers: [],
        result: { title: '', items: [] }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid payload');
    expect(res.body).toHaveProperty('issues');
    expect(Array.isArray(res.body.issues)).toBe(true);
  });
});
