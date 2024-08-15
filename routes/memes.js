const express = require('express');
const router = express.Router();
const MemeController = require('../controllers/memeController.js');
const ensureAuthenticated = require('../middleware/auth');

// Routes for memes
router.get('/create/:UserId', ensureAuthenticated, MemeController.createMemeGet); // Create a new meme
router.post('/create/:UserId', ensureAuthenticated, MemeController.createMemePost); // Create a new meme
router.get('/', MemeController.getAllMemes); // Get all memes
router.get('/:id/edit', ensureAuthenticated, MemeController.getMemeById); // Get a single meme by ID
router.put('/:id', ensureAuthenticated, MemeController.updateMeme); // Update a meme
router.post('/:id/delete', ensureAuthenticated, MemeController.deleteMeme); // Delete a meme

module.exports = router;
