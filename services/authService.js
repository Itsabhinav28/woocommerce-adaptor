const jwt = require('jsonwebtoken');
const RegistryService = require('./registryService');
const logger = require('../utils/logger');
const config = require('../config/config');

class AuthService {
  static async authenticate(subscriberId, credentials) {
    try {
      // Validate subscriber in registry
      const isValidSubscriber = await RegistryService.validateSubscriber(subscriberId);
      if (!isValidSubscriber) {
        throw new Error('Invalid subscriber');
      }

      // Additional authentication logic can be added here
      const token = this.generateToken(subscriberId);
      return token;
    } catch (error) {
      logger.error('Authentication failed', error);
      throw error;
    }
  }

  static generateToken(subscriberId) {
    return jwt.sign(
      { subscriberId },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      return await RegistryService.validateSubscriber(decoded.subscriberId);
    } catch (error) {
      logger.error('Token verification failed', error);
      return false;
    }
  }
}

module.exports = AuthService;