const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // 5 попыток
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many login attempts, please try again later',
    });
  },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // 10 попыток (чуть больше, регистрация реже)
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many registration attempts, please try again later',
    });
  },
});

module.exports = { loginLimiter, registerLimiter };