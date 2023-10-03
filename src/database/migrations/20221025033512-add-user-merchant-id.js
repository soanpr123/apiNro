'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'merchantId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'users',
      'merchantId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );
  },
};
