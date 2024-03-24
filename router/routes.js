const express = require('express');
const router = express.Router();

const urlController = require('../controllers/urlController');

router.post('/generateShorturl', urlController.createShortURL);
router.get('/:shortCode', urlController.redirectUrl);
router.get('/clickCount/:shortCodes', urlController.clickTracker);

module.exports = router;