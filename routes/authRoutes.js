const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/ondcAuthMiddleware');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/validate-token', authMiddleware, AuthController.validateToken);

module.exports = router;