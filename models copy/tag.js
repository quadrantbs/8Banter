'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Meme, { through: models.MemeTag, foreignKey: 'tagId' });
    }
  }

  Tag.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });

  return Tag;
};
