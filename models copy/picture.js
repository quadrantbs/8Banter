'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    static associate(models) {
      this.hasMany(models.Meme, { foreignKey: 'pictureId' });
    }
  }

  Picture.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
  }, {
    sequelize,
    modelName: 'Picture',
  });

  return Picture;
};
