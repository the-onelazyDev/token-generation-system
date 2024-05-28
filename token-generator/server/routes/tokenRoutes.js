const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/generate-tokens', tokenController.generateTokens);
router.post('/verify-token', tokenController.verifyToken);

module.exports = router;