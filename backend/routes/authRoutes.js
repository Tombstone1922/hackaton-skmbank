const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const  { loginLimiter, registerLimiter } = require('../middlewares/rateLimiteMiddleware');


router.post('/login', loginLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/register', registerLimiter, authController.register);

module.exports = router;
