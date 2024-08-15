'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name:'admin1',
        email: 'admin@example.com',
        password: await bcrypt.hash('hashedpassword1', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'asep',
        email: 'asep@example.com',
        password: await bcrypt.hash('hashedpassword2', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'ucok',
        email: 'ucok@example.com',
        password: await bcrypt.hash('hashedpassword3', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
