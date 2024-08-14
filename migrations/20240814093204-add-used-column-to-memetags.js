'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MemeTags', 'used', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Set a default value of 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MemeTags', 'used');
  }
};
