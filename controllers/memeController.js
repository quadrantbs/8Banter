const Meme = require('../models').Meme;

class MemeController {
  static async createMeme(req, res) {
    try {
      const { title, PictureId, topText, bottomText, userId } = req.body;
      const meme = await Meme.create({ title, PictureId, topText, bottomText, userId });
      res.status(201).json(meme);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllMemes(req, res) {
    try {
      const memes = await Meme.findAll();
      res.status(200).json(memes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getMemeById(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.id);
      if (!meme) return res.status(404).json({ error: 'Meme not found' });
      res.status(200).json(meme);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateMeme(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.id);
      if (!meme) return res.status(404).json({ error: 'Meme not found' });
      const { title, PictureId, topText, bottomText } = req.body;
      if (title) meme.title = title;
      if (PictureId) meme.PictureId = PictureId;
      if (topText) meme.topText = topText;
      if (bottomText) meme.bottomText = bottomText;
      await meme.save();
      res.status(200).json(meme);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteMeme(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.id);
      if (!meme) return res.status(404).json({ error: 'Meme not found' });
      await meme.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MemeController;
