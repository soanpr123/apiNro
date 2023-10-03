'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'system_logs',
      'message',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'system_logs',
      'message',
      {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
    );
  },
};
