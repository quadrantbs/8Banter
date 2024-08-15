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
      // Ambil UserId dari URL params
      const UserId = req.params.UserId;

      // Ambil data dari request body
      let { title, PictureId, topText, bottomText, tags = [], newTagName, pictureName, pictureUrl } = req.body;
      if (PictureId === "new") {
        // Logika untuk menyimpan gambar baru ke database
        const newPicture = await Picture.create({ name: pictureName, url: pictureUrl });
        console.log(newPicture);
        PictureId = newPicture.id; // Gunakan ID dari gambar baru untuk menyimpan meme
      }
      // Validasi apakah ada pictureId yang dipilih
      if (!PictureId) {
        req.flash('error', 'Please select a picture.');
        return res.redirect(`/memes/create/${UserId}`);
      }

      // Proses untuk menambahkan tag baru jika ada
      let tagIds = Array.isArray(tags) ? tags : [tags]; // Memastikan tags adalah array

      if (newTagName) {
        // Cek apakah tag baru sudah ada di database
        const [newTag, created] = await Tag.findOrCreate({
          where: { name: newTagName }
        });
        if (created) {
          tagIds.push(newTag.id); // Tambahkan ID tag baru ke array tagIds
        } else {
          tagIds.push(newTag.id); // Jika sudah ada, tetap tambahkan ID-nya
        }
      }

      // Buat meme baru dengan data yang diberikan
      const newMeme = await Meme.create({
        title,
        PictureId,
        topText,
        bottomText,
        UserId // Tambahkan UserId
      });

      // Hubungkan meme dengan tags yang ada
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
              attributes: ['name']
            },
            attributes: ['content']
          },
          {
            model: User,
            attributes: ['name']
          }
        ]
      });
      memes.forEach(e => {
        console.log(e.Picture);
      });
      res.render('Memes', { memes, user: req.user })
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
