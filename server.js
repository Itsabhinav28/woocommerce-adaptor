require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const logger = require('./utils/logger');

const authRoutes = require('./routes/authRoutes');
const registryRoutes = require('./routes/registryRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/registry', registryRoutes);
app.use('/verify', verificationRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;