const express = require('express');
const router = express.Router();
const UserController  = require('../controllers/userController.js');

// Routes for user
router.post('/register', UserController.register); // Register a new user
router.post('/login', UserController.login); // User login
router.get('/profile/:id', UserController.getProfile); // Get user profile
router.put('/profile/:id', UserController.updateProfile); // Update user profile
router.delete('/profile/:id', UserController.deleteProfile); // Delete user profile

module.exports = router;
