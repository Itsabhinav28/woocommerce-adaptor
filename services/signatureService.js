const { blake2b } = require('blakejs');
const nacl = require('tweetnacl');
const logger = require('../utils/logger');

class SignatureService {
  static generateDigest(payload) {
    const serializedPayload = JSON.stringify(payload);
    const digestBuffer = blake2b(serializedPayload, null, 64);
    return Buffer.from(digestBuffer).toString('base64');
  }

  static generateSigningString(created, expires, digest) {
    return `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digest}`;
  }

  static signPayload(signingString, privateKey) {
    try {
      const privateKeyBuffer = Buffer.from(privateKey, 'base64');
      const signatureBuffer = nacl.sign.detached(
        Buffer.from(signingString),
        privateKeyBuffer
      );
      return Buffer.from(signatureBuffer).toString('base64');
    } catch (error) {
      logger.error('Signature generation failed', error);
      throw error;
    }
  }

  static verifySignature(signingString, signature, publicKey) {
    try {
      return nacl.sign.detached.verify(
        Buffer.from(signingString),
        Buffer.from(signature, 'base64'),
        Buffer.from(publicKey, 'base64')
      );
    } catch (error) {
      logger.error('Signature verification failed', error);
      return false;
    }
  }
}

module.exports = SignatureService;
