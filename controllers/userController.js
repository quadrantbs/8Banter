const { User, Meme, Picture, Tag, Comment } = require('../models');
const bcrypt = require('bcrypt');
const { all } = require('../routes/users');

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
      res.redirect('/users/login');
    } catch (error) {
      res.redirect(`/?error=${error.toLocaleString()}`)
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
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      await user.checkPassword(password);
      const memes = await Meme.findAll({
        include: [
          {
            model: Picture,
            attributes: ['name', 'url'],
          },
          {
            model: Tag,
            through: { attributes: ['used'] },
            attributes: ['id', 'name']
          },
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['email']
            },
            attributes: ['content']
          },
          {
            model: User,
            attributes: ['name']
          }
        ]
      });
      console.log(memes[0].Picture);
      res.render('Memes', { memes });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  static async updateProfile(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const { email, password, role } = req.body;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (email) user.email = email;
      if (role) user.role = role;
      await user.save();
      res.status(200).json(user);
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
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
}

module.exports = UserController;
