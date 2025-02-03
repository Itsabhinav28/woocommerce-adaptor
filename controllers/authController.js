const AuthService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  static async login(req, res) {
    try {
      const { subscriberId, credentials } = req.body;
      const token = await AuthService.authenticate(subscriberId, credentials);
      res.json({ token });
    } catch (error) {
      logger.error('Login failed', error);
      res.status(401).json({ error: 'Authentication failed' });
    }
  }

  static async validateToken(req, res) {
    try {
      const { token } = req.body;
      const isValid = await AuthService.verifyToken(token);
      res.json({ valid: isValid });
    } catch (error) {
      logger.error('Token validation failed', error);
      res.status(500).json({ error: 'Token validation error' });
    }
  }
}

module.exports = AuthController;
