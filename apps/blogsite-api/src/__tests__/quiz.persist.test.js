const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;
const quizRoute = require('../routes/quiz');

describe('POST /api/quiz-results (persist optional)', () => {
  const app = express();
  app.use(bodyParser());
  app.use('/api', quizRoute);

  it('201 with id for valid payload', async () => {
    const res = await request(app).post('/api/quiz-results').send({
      answers: ['Outdoorsy','$$','Eco-friendly'],
      result: { title:'Trail-Ready', items:['Eco-friendly mugs'] }
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.quiz_result_id).toMatch(/^qr_/);
  });
});


