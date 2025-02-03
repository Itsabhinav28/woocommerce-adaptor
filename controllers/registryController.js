const RegistryService = require('../services/registryService');
const logger = require('../utils/logger');

class RegistryController {
  static async lookupSubscriber(req, res) {
    try {
      const { subscriberId, keyId } = req.query;
      const subscriberDetails = await RegistryService.lookupSubscriber(subscriberId, keyId);
      res.json(subscriberDetails);
    } catch (error) {
      logger.error('Subscriber lookup failed', error);
      res.status(404).json({ error: 'Subscriber not found' });
    }
  }

  static async validateSubscriber(req, res) {
    try {
      const { subscriberId } = req.query;
      const isValid = await RegistryService.validateSubscriber(subscriberId);
      res.json({ valid: isValid });
    } catch (error) {
      logger.error('Subscriber validation failed', error);
      res.status(500).json({ error: 'Validation error' });
    }
  }
}

module.exports = RegistryController;