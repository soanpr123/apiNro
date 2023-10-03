'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('account_bank', 'cashOutBankId', { type: Sequelize.STRING(255), allowNull: true, after: 'regexWithdrawTransIdIndex' });
    await queryInterface.addColumn('account_bank', 'cashOutNumber', { type: Sequelize.STRING(255), allowNull: true, after: 'regexWithdrawTransIdIndex' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('account_bank', 'cashOutBankId', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.removeColumn('account_bank', 'cashOutNumber', { type: Sequelize.STRING(255), allowNull: true });
  },
};
