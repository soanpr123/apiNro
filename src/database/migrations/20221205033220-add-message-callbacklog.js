'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('callback_logs', 'message', { type: Sequelize.STRING(500), allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('callback_logs', 'message', { type: Sequelize.STRING(500), allowNull: true });
  },
};
