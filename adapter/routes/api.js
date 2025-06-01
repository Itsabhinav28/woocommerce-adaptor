const express = require('express');
const router = express.Router();

router.post('/init', async (req, res) => {
  try {
    // Log incoming request
    console.log('Received init request:', JSON.stringify(req.body, null, 2));

    // Basic validation
    if (!req.body.context || !req.body.message) {
      return res.status(400).json({
        error: {
          message: "Invalid request format"
        }
      });
    }

    // Mock response for testing
    const response = {
      context: {
        ...req.body.context,
        timestamp: new Date().toISOString()
      },
      message: {
        ack: {
          status: "ACK"
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Init handler error:', error);
    res.status(500).json({
      error: {
        message: "Internal server error"
      }
    });
  }
});

module.exports = router;