'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini
      this.hasOne(models.Bio, { foreignKey: 'userId' });
      this.hasMany(models.Comment, { foreignKey: 'userId' });
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Email must be valid" },
        notEmpty: { msg: "Email cannot be empty" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty" },
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: "Role must be 'admin' or 'user'",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
