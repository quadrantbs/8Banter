const Comment = require('../models').Comment;

class CommentController {
  static async addComment(req, res) {
    try {
      const { content, userId, memeId } = req.body;
      const comment = await Comment.create({ content, userId, memeId });
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getCommentsByMeme(req, res) {
    try {
      const comments = await Comment.findAll({ where: { memeId: req.params.memeId } });
      res.status(200).json(comments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateComment(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
      comment.content = req.body.content || comment.content;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
      await comment.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CommentController;
