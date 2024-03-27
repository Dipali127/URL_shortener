const express = require('express');
const router = express.Router();

const urlController = require('../controllers/urlController');

router.post('/generateShorturl', urlController.createShortURL);
router.get('/:shortCode', urlController.redirectUrl);
router.get('/clickCount/:shortCode', urlController.clickTracker);

module.exports = router;