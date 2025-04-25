const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Извлекаем токен из headers

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user;  // Сохраняем данные о пользователе в req.user
    next();  // Передаём управление дальше
  });
};

module.exports = { authenticate };
