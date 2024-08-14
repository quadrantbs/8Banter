'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meme extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Picture, { foreignKey: 'pictureId' });
      this.belongsToMany(models.Tag, { through: models.MemeTag, foreignKey: 'memeId' });
      this.hasMany(models.Comment, { foreignKey: 'memeId' });
    }
  }

  Meme.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Title cannot be empty" },
      },
    },
    topText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bottomText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Meme',
  });

  return Meme;
};
