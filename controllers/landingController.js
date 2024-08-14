class LandingController {
    static async getLandingPage(req, res) {
      try {
        res.render('landing');
      } catch (error) {
        console.error('Error rendering landing page:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  }
  
  module.exports = LandingController;
  