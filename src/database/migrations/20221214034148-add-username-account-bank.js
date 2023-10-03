'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('account_bank', 'username', { type: Sequelize.STRING(255), allowNull: true, after: 'type' });
    await queryInterface.addColumn('account_bank', 'password', { type: Sequelize.STRING(255), allowNull: true, after: 'type' });
    await queryInterface.addColumn('account_bank', 'workerTopupMethod', { type: Sequelize.STRING(255), allowNull: true, after: 'type' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('account_bank', 'username', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.removeColumn('account_bank', 'password', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.removeColumn('account_bank', 'workerTopupMethod', { type: Sequelize.STRING(255), allowNull: true });
  },
};
