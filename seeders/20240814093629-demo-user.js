'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: 'hashedpassword1', 
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'asep@example.com',
        password: 'hashedpassword2', 
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ucok@example.com',
        password: 'hashedpassword3', 
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
