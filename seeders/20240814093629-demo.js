'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin1',
        email: 'admin@example.com',
        password: await bcrypt.hash('hashedpassword1', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'asep',
        email: 'asep@example.com',
        password: await bcrypt.hash('hashedpassword2', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ucok',
        email: 'ucok@example.com',
        password: await bcrypt.hash('hashedpassword3', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'funny',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'cute',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'animals',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'memes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    await queryInterface.bulkInsert('Pictures', [
      {
        name: 'Spongebob - Dont you squidward',
        url: 'https://imgflip.com/s/meme/Dont-You-Squidward.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hide the Pain Harold',
        url: 'https://i.imgflip.com/1cf8by.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Narcos waiting',
        url: 'https://i.imgflip.com/28this.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Me explaining to my mom',
        url: 'https://i.imgflip.com/32gou1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'And everybody loses their minds',
        url: 'https://imgflip.com/s/meme/And-everybody-loses-their-minds.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Pictures', null, {});
  }
};
