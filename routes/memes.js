const express = require('express');
const router = express.Router();
const MemeController = require('../controllers/memeController.js');

// Routes for memes
router.post('/create', MemeController.createMeme); // Create a new meme
router.get('/', MemeController.getAllMemes); // Get all memes
router.get('/:id', MemeController.getMemeById); // Get a single meme by ID
router.put('/:id', MemeController.updateMeme); // Update a meme
router.delete('/:id', MemeController.deleteMeme); // Delete a meme

module.exports = router;
