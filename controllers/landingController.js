class LandingController {
  static async getLandingPage(req, res) {
    try {
      if (req.user) {
        return res.redirect('/memes');
      }
      const { error } = req.query;
      res.render('LandingPage', { error });
    } catch (error) {
      console.error('Error rendering landing page:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = LandingController;
