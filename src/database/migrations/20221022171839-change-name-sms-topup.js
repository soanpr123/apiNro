'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sms_topup', 'bankBIN');
    await queryInterface.addColumn(
      'sms_topup',
      'bankId',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );

    await queryInterface.removeColumn('sms_withdraw', 'bankBIN');
    await queryInterface.addColumn(
      'sms_withdraw',
      'bankId',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'sms_topup',
      'bankBIN',
      {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.removeColumn('sms_topup', 'bankId');

    await queryInterface.addColumn(
      'sms_withdraw',
      'bankBIN',
      {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.removeColumn('sms_withdraw', 'bankId');
  },
};
