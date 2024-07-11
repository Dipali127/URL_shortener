// routes.js
import express from 'express';
const router = express.Router();

import { createShortURL, redirectUrl, clickTracker } from '../controllers/urlController.js';

// Route to generate a short URL for a long URL
router.post('/generateShorturl', createShortURL);

// Route to redirect the user to the long URL associated with the provided short code
router.get('/:shortCode', redirectUrl);

// Route to get the total number of clicks on a short URL
router.get('/clickCount/:shortCode', clickTracker);

export default router;
