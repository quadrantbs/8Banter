const { User, Bio } = require('../models');

class UserController {
  static async registerPage(req, res) {
    try {
      res.render('RegisterPage');
    } catch (error) {
      res.redirect(`/?error=${error.toLocaleString()}`)
      console.log(error);
    }
  }
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      await User.create({ name, email, password, role: 'user' });
      req.flash('success_msg', 'Registration successful. Please login.');
      res.redirect('/users/login');
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/users/register');
      console.log(error);
    }
  }

  static async loginPage(req, res) {
    try {
      res.render('LoginPage');
    } catch (error) {
      res.redirect(`/?error=${error.toLocaleString()}`)
      console.log(error);
    }
  }

  static logout(req, res) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success_msg', 'You are logged out.');
      res.redirect('/users/login');
    });
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [Bio],
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      console.log(user)
      res.render('Profile', { user, userSession: req.user }); // Render Profile.ejs dengan data user
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }  

  static async getUpdateProfile(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: Bio,
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.render('updateProfile', { user });
    } catch (error) {
      res.status(400).json({ error: error.message });      
      console.log(error);
    }
  }

  static async postUpdateProfile(req, res) {
    try {
      const { profilePicture, biodata } = req.body;
      const userId = req.params.id;
      
      // console.log('Received data:', { profilePicture, biodata, userId });

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      let bio = await Bio.findOne({ where: { UserId: user.id } });
      if (!bio) {
          bio = await Bio.create({ profilePicture, biodata, UserId: user.id });
      } else {
          await bio.update({ profilePicture, biodata });
      }

      res.redirect(`/users/profile/${userId}`);
  } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
  }
  }

  static async deleteProfile(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.destroy();
      res.redirect('/memes');
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
}

module.exports = UserController;
