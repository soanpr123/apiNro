'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'account_bank',
      'regexTopupPartnerRef',
      {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'account_bank',
      'regexTopupPartnerRefIndex',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true,
      },
    );

    await queryInterface.addColumn(
      'account_bank',
      'regexWithdrawTransId',
      {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'account_bank',
      'regexWithdrawTransIdIndex',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('account_bank', 'regexTopupPartnerRef');
    await queryInterface.removeColumn('account_bank', 'regexTopupPartnerRefIndex');

    await queryInterface.removeColumn('account_bank', 'regexWithdrawTransId');
    await queryInterface.removeColumn('account_bank', 'regexWithdrawTransIdIndex');
  },
};
