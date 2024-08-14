const router = require('express').Router();
const LandingController = require('../controllers/landingController.js');
const userRoutes = require('./users');
const memeRoutes = require('./memes');
const commentRoutes = require('./comments');

router.get('/', LandingController.getLandingPage);
router.use('/users', userRoutes);
router.use('/memes', memeRoutes);
router.use('/comments', commentRoutes);

module.exports = router;