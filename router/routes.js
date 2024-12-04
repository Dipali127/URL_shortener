// routes.js
import express from 'express';
const router = express.Router();

import { createShortURL, redirectUrl, handleClick} from '../controllers/urlController.js';

// Route to render the home page
router.get('/', (req, res) => {
    return res.render("server");
});

// Route to generate a short URL for a long URL
router.post('/generateShorturl', createShortURL);

// Route to redirect the user to the long URL associated with the provided short code
router.get('/:shortCode', redirectUrl);

// Route to get the total number of clicks on a short URL
router.get('/clickCount/:shortCode', handleClick);

// Route to track clicks based on the entered short URL
router.post('/trackClicks', handleClick);



export default router;
