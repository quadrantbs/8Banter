'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bio extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Bio.init({
    profilePicture: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Profile picture cannot be empty" },
      },
    },
    biodata: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: { msg: "Biodata cannot be empty" },
      },
    },
  }, {
    sequelize,
    modelName: 'Bio',
  });

  return Bio;
};
