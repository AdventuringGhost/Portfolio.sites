const { Router } = require('express');
const r = Router();
r.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));
module.exports = r;
