const { Router } = require('express');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const QuizResult = require('../models/QuizResult');
const router = Router();

const QuizSubmission = z.object({
  answers: z.array(z.string().min(1)).min(1).max(10),
  result: z.object({
    title: z.string().min(1),
    items: z.array(z.string().min(1)).min(1).max(10)
  }),
  meta: z.object({ ua: z.string().optional() }).partial().optional()
}).strict();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 30, // 30 quiz posts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/quiz-results', limiter, async (req, res) => {
  const parsed = QuizSubmission.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues });
  }
  const { answers, result, meta } = parsed.data;
  const quiz_result_id = `qr_${Math.random().toString(36).slice(2, 10)}`;
  const createdAt = new Date().toISOString();

  // Demo logging only (no persistence yet)
  console.log('QUIZ_SUBMISSION', { quiz_result_id, answers, result, meta, createdAt });
  
  // Optional persistence (only if Mongo connected)
  try {
    if (process.env.MONGO_URI) {
      await QuizResult.create({ answers, result, meta, quiz_result_id, createdAt });
    }
  } catch (e) {
    console.warn('Persist warning:', e.message);
  }
  
  return res.status(201).json({ ok: true, quiz_result_id, createdAt });
});

// DEV-ONLY endpoint to inspect stored quiz results (use before launch)
if (process.env.NODE_ENV !== 'production') {
  router.get('/quiz-results', async (req, res) => {
    if (!process.env.MONGO_URI) return res.json({ items: [], next: null });
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const items = await QuizResult.find().sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ items, next: null });
  });
}

module.exports = router;
