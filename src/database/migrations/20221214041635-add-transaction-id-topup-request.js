'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('topup_request', 'bankTransactionId', { type: Sequelize.STRING(255), allowNull: true, after: 'statusCallback' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('topup_request', 'bankTransactionId', { type: Sequelize.STRING(255), allowNull: true });
  },
};
