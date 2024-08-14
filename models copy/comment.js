'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Meme, { foreignKey: 'memeId' });
    }
  }

  Comment.init({
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: { msg: "Content cannot be empty" },
      },
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
