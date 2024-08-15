'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    static associate(models) {
      this.hasMany(models.Meme, { foreignKey: 'PictureId' });
    }
  }

  Picture.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    }, 
    url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Url cannot be empty" },
      },
    },
  }, {
    sequelize,
    modelName: 'Picture',
  });

  return Picture;
};
