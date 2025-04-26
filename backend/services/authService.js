const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../prismaClient'); // Prisma client

// Регистрация пользователя
exports.register = async (username, password) => {
  // Проверяем, существует ли пользователь с таким username
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    throw new Error('Username already taken');
  }

  // Хешируем пароль
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Создаем пользователя
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  return { id: user.id, username: user.username };
};

// Логин пользователя
exports.login = async (username, password) => {
  // Ищем пользователя по username
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Проверяем пароль
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Генерируем токены
  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

// Обновление токенов
exports.refresh = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const newRefreshToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};

// Логаут пользователя
exports.logout = async (refreshToken) => {
  try {
    // Проверяем, существует ли refreshToken в базе данных
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }, // Предполагаем, что у тебя есть поле 'token' в модели
    });

    if (!tokenRecord) {
      return;
    }

    // Если токен найден, удаляем его
    const deletedToken = await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });
    console.log('Token deleted:', deletedToken);
  } catch (err) {
    console.error('Error during logout:', err);
    throw new Error('Failed to log out');
  }
};
