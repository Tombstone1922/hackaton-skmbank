const authService = require('../services/authService');

exports.register = async (username, password) => {
  // Проверка на существование юзера
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    throw new Error('Username already taken');
  }

  // Хешируем пароль
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Создаем юзера
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  return { id: user.id, username: user.username };
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password ) {
    return res.status(400).json({ message: 'Username and password are required'});
  }

  try {
    const result = await authService.login(username, password);
    res.status(200).json(result)
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const result = await authService.refresh(refreshToken);
    res.status(200).json({ result })
  } catch (err) {
    console.log("Refresh error:", err)
    return res.status(401).json({ message: err.message || 'Invalid refresh token' });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  // Валидация
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    await authService.logout(refreshToken);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(401).json({ message: err.message || 'Invalid refresh token' });
  }
};
