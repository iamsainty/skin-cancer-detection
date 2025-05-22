const express = require('express');
const router = express.Router();
const { register, verifyOTP, login, getMe } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/me', verifyToken, getMe);

module.exports = router;