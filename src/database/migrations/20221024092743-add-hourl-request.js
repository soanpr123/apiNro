'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'topup_request',
      'hourUpdatedAt',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'withdraw_request',
      'hourUpdatedAt',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('topup_request', 'hourUpdatedAt');
    await queryInterface.removeColumn('withdraw_request', 'hourUpdatedAt');
  },
};
