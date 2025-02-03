const logger = require("../utils/logger");

const handleError = (res, error, customMessage) => {
  logger.error(customMessage, { error: error.message, stack: error.stack });
  res.status(500).json({ error: customMessage });
};

module.exports = handleError;