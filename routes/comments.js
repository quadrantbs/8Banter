const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController.js');

// Routes for comments
router.post('/', CommentController.addComment); // Add a comment to a meme
router.get('/:memeId', CommentController.getCommentsByMeme); // Get all comments for a meme
router.put('/:id', CommentController.updateComment); // Update a comment
router.delete('/:id', CommentController.deleteComment); // Delete a comment

module.exports = router;
