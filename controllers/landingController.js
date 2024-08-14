class LandingController {
  static async getLandingPage(req, res) {
    try {
      const { error } = req.query
      res.render('LandingPage', { error });
    } catch (error) {
      console.error('Error rendering landing page:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = LandingController;
