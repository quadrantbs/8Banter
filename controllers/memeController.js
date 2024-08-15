const { User, Meme, Picture, Tag, Comment } = require('../models');

class MemeController {

  static async createMemeGet(req, res) {
    try {
      const { UserId } = req.params;
      const pictures = await Picture.findAll({
        attributes: ['id', 'name', 'url']
      });
      const tags = await Tag.findAll({
        attributes: ['id', 'name']
      });
      res.render('CreateMemeForm', { pictures, tags, UserId, user: req.user })
    } catch (error) {
      console.log(error);
      req.flash('error', 'Something is wrong. lol.');
      res.redirect('/memes/create');
    }
  }
  static async createMemePost(req, res) {
    try {
      const UserId = req.params.UserId;

      let { title, PictureId, topText, bottomText, tags = [], newTagName, pictureName, pictureUrl } = req.body;
      if (PictureId === "new") {
        const newPicture = await Picture.create({ name: pictureName, url: pictureUrl });
        console.log(newPicture);
        PictureId = newPicture.id;
      }
      if (!PictureId) {
        req.flash('error', 'Please select a picture.');
        return res.redirect(`/memes/create/${UserId}`);
      }

      let tagIds = Array.isArray(tags) ? tags : [tags];

      if (newTagName) {
        const newTags = newTagName.split(',').map(tag => tag.trim());

        for (const tagName of newTags) {
          if (tagName) {
            const [newTag, created] = await Tag.findOrCreate({
              where: { name: tagName }
            });
            if (created) {
              tagIds.push(newTag.id);
            } else {
              tagIds.push(newTag.id);
            }
          }
        }
      }

      const newMeme = await Meme.create({
        title,
        PictureId,
        topText,
        bottomText,
        UserId
      });

      if (tagIds.length > 0) {
        await newMeme.setTags(tagIds);
      }
      req.flash('success_msg', 'Meme created successfully!');
      res.redirect('/memes');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllMemes(req, res) {
    try {
      const tagId = req.query.tagId;
      const memes = await Meme.getAllWithFilter(tagId)
      const memesWithTags = await Meme.findAll({
        include: [
          {
            model: Tag,
            through: { attributes: ['used'] },
            attributes: ['id', 'name'],
          },
        ],
      });

      const tags = await Tag.findAll();
      res.render('Memes', { memes, memesWithTags, user: req.user, Meme, tags });
    } catch (error) {
      res.send({ error: error.message });
      console.log(error);
    }
  }

  static async getMemeById(req, res) {
    try {
      const meme = await Meme.findOne({
        include: [
          {
            model: User,
            attributes: ['name', 'id'],
          },
          {
            model: Picture,
            attributes: ['name', 'url'],
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['name'],
            },
            attributes: ['content'],
          },
        ],
        where: {
          id: req.params.id
        }
      });
      if (!meme) return res.status(404).json({ error: 'Meme not found' });
      const tags = await Tag.findAll();
      // res.send(meme)
      console.log(meme.Tags);
      res.render('MemeEdit', { meme, user: req.user, tags });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateMeme(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.id);
      if (!meme) return res.status(404).json({ error: 'Meme not found' });
      const { title, PictureId, topText, bottomText } = req.body;
      await meme.update({ title, PictureId, topText, bottomText });
      res.redirect('/memes');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteMeme(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.id);
      if (!meme) return res.status(404).json({ error: 'Meme not found' });
      await meme.destroy();
      res.redirect('/');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MemeController;
