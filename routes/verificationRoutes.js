const express = require('express');
const VerificationController = require('../controllers/verificationController');
const signatureMiddleware = require('../middlewares/signatureMiddleware');

const router = express.Router();

router.post('/signature/verify', signatureMiddleware, VerificationController.verifySignature);
router.post('/signature/generate', signatureMiddleware, VerificationController.generateSignature);

module.exports = router;