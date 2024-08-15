'use strict';
const { Model } = require('sequelize');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meme extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.belongsTo(models.Picture, { foreignKey: 'PictureId' });
      this.belongsToMany(models.Tag, { through: models.MemeTag, foreignKey: 'MemeId' });
      this.hasMany(models.Comment, { foreignKey: 'MemeId' });
    }

    upperCaseBottomText() {
      if (this.bottomText) {
        return this.bottomText.toUpperCase();
      }
    }
    upperCaseTopText() {
      if (this.topText) {
        return this.topText.toUpperCase();
      }
    }

    static formatDate(date) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };

      return new Intl.DateTimeFormat('id-ID', options).format(date).replace(',', '');
    }

    static async getAllWithFilter(tagId) {
      const memes = await Meme.findAll({
        include: [
          {
            model: sequelize.models.Picture,
            attributes: ['name', 'url'],
          },
          {
            model: sequelize.models.Tag,
            through: { attributes: ['used'] },
            attributes: ['id', 'name'],
            where: tagId ? { id: { [Op.eq]: tagId } } : {},
          },
          {
            model: sequelize.models.Comment,
            include: {
              model: sequelize.models.User,
              attributes: ['name'],
            },
            attributes: ['content'],
          },
          {
            model: sequelize.models.User,
            attributes: ['name', 'id'],
          },
        ],
      });
      return memes;
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
