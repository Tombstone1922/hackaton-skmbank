const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');  // Подключаем Prisma
const bcrypt = require('bcrypt');
require('dotenv').config();

// Создание токенов
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

exports.login = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Найдём пользователя по username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Проверяем, совпадает ли пароль
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Генерация токенов
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      refreshToken,
      expiresIn: 3600
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.refresh = async (req, res) => {
  const { refreshToken } = req.body || {};

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

    if (!dbUser) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newToken = generateAccessToken(dbUser);

    res.json({
      token: newToken,
      expiresIn: 3600
    });
  });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body || {};

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  // Инвалидируем refresh token в базе данных
  await prisma.refreshToken.delete({
    where: { token: refreshToken }
  });

  res.json({ message: 'Logged out successfully' });
};
