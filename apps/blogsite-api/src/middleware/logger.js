const pino = require('pino')();
module.exports = (req, _res, next) => { pino.info({ method: req.method, url: req.url }); next(); };
