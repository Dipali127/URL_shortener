const express = require('express');
const router = express.Router();

const urlController = require('../controllers/urlController');

// Route to generate a short URL for a long URL
router.post('/generateShorturl', urlController.createShortURL);

// Route to redirect the user to the long URL associated with the provided short code
router.get('/:shortCode', urlController.redirectUrl);

// Route to get the total number of clicks on a short URL
router.get('/clickCount/:shortCode', urlController.clickTracker);

module.exports = router;