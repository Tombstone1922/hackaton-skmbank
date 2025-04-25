require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { authenticate } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🔥 API работает!');
});

app.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Привет, ${req.user.username}` });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
