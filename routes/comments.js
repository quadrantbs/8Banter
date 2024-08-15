const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController.js');
const ensureAuthenticated = require('../middleware/authenthication');

// Routes for comments
router.post('/', ensureAuthenticated, CommentController.addComment); // Add a comment to a meme
router.get('/:memeId', ensureAuthenticated, CommentController.getCommentsByMeme); // Get all comments for a meme
router.get('/:id', ensureAuthenticated,  CommentController.updateComment); // Update a comment
router.delete('/:id', ensureAuthenticated,  CommentController.deleteComment); // Delete a comment

module.exports = router;
