'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meme extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.belongsTo(models.Picture, { foreignKey: 'PictureId' });
      this.belongsToMany(models.Tag, { through: models.MemeTag, foreignKey: 'MemeId' });
      this.hasMany(models.Comment, { foreignKey: 'MemeId' });
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
