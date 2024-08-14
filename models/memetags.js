'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MemeTag extends Model {}

  MemeTag.init({
    used: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'MemeTag',
  });

  return MemeTag;
};
