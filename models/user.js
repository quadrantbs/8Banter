'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini
      this.hasOne(models.Bio, { foreignKey: 'UserId' });
      this.hasMany(models.Comment, { foreignKey: 'UserId' });
    }

  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {

        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser) {
          throw new Error('Email already in use');
        }
      },
      beforeUpdate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword
      },
    },
    methods: {
      isAdmin() {
        return this.role === 'admin';
      }
    }
  });

  return User;
};
