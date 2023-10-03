'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('account_bank', 'errorMessage', { type: Sequelize.STRING(255), allowNull: true, after: 'cashOutNumber' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('account_bank', 'errorMessage', { type: Sequelize.STRING(255), allowNull: true });
  },
};
