const SignatureService = require('../services/signatureService.js');
const logger = require('../utils/logger');

class VerificationController {
  static async verifySignature(req, res) {
    try {
      const { payload, signature, publicKey } = req.body;
      const isValid = SignatureService.verifySignature(payload, signature, publicKey);
      res.json({ valid: isValid });
    } catch (error) {
      logger.error('Signature verification failed', error);
      res.status(500).json({ error: 'Verification failed' });
    }
  }

  static async generateSignature(req, res) {
    try {
      const { payload, privateKey } = req.body;
      const signature = SignatureService.signPayload(payload, privateKey);
      res.json({ signature });
    } catch (error) {
      logger.error('Signature generation failed', error);
      res.status(500).json({ error: 'Signature generation failed' });
    }
  }
}

module.exports = VerificationController;
