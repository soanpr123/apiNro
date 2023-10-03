'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('account_bank', 'statusWithdraw'),
      queryInterface.removeColumn('account_bank', 'statusTopup'),
      queryInterface.addColumn(
        'account_bank',
        'type',
        {
          type: Sequelize.STRING(255),
          defaultValue: null,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'account_bank',
        'status',
        {
          type: Sequelize.STRING(255),
          defaultValue: null,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('account_bank', 'type'),
      queryInterface.removeColumn('account_bank', 'status'),
    ]);
  },
};
