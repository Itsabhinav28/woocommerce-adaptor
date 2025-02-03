const express = require('express');
const RegistryController = require('../controllers/registryController');
const authMiddleware = require('../middlewares/ondcAuthMiddleware');

const router = express.Router();

router.get('/lookup', authMiddleware, RegistryController.lookupSubscriber);
router.get('/validate', authMiddleware, RegistryController.validateSubscriber);

module.exports = router;
