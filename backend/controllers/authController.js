const authService = require('../services/authService'); // Обработка логики
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await authService.register(username, password);
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: result.id,
        username: result.username,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(409).json({ message: err.message || 'Username already taken' });
  }
};

// Логин пользователя
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await authService.login(username, password);

    // Устанавливаем cookies с токенами
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Безопасность для production
      sameSite: 'Strict', // Для защиты от CSRF
      maxAge: 15 * 60 * 1000, // 15 минут
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Безопасность для production
      sameSite: 'Strict', // Для защиты от CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(401).json({ message: err.message || 'Invalid credentials' });
  }
};

// Обновление токенов
exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies; // Получаем refreshToken из cookies

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  try {
    const result = await authService.refresh(refreshToken);

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 минут
    });

    if (result.refreshToken) {
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      });
    }

    return res.status(200).json({ message: 'Token refreshed' });
  } catch (err) {
    console.error('Refresh error:', err);
    return res.status(401).json({ message: err.message || 'Invalid refresh token' });
  }
};

// Логаут пользователя
exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies || {}; // Защита от undefined

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    await authService.logout(refreshToken);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(401).json({ message: err.message || 'Invalid refresh token' });
  }
};

// Информация о текущем пользователе (только для авторизованных)
exports.me = async (req, res) => {
  const { accessToken } = req.cookies; // Получаем accessToken из cookies

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    return res.status(200).json({
      username: decoded.username,
      id: decoded.id,
    });
  } catch (err) {
    console.error('Me error:', err);
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};
