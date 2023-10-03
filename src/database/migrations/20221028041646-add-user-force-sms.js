'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'typeTopup',
      {
        type: Sequelize.STRING(255),
        default: 'request-first',
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'users',
      'typeTopup',
      {
        type: Sequelize.STRING(255),
        default: 'request-first',
        allowNull: true,
      },
    );
  },
};
