const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    await authService.logout(refreshToken);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
