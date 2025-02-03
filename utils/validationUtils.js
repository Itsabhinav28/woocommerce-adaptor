const Joi = require('joi');

class ValidationUtils {
  static validateSubscriber(data) {
    const schema = Joi.object({
      subscriberId: Joi.string().required(),
      uniqueKeyId: Joi.string().required(),
      publicKey: Joi.string().required(),
      domain: Joi.string().required(),
      cities: Joi.array().items(Joi.string())
    });

    return schema.validate(data);
  }

  static validateSignature(data) {
    const schema = Joi.object({
      payload: Joi.object().required(),
      signature: Joi.string().required(),
      publicKey: Joi.string().required()
    });

    return schema.validate(data);
  }
}

module.exports = ValidationUtils;
