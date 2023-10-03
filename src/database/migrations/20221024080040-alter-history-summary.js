'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'history_summary',
      'totalTopup',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'history_summary',
      'countNickNameTopup',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'history_summary',
      'countRequestTopup',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );

    await queryInterface.addColumn(
      'history_summary',
      'totalWithdraw',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'history_summary',
      'countNickNameWithdraw',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'history_summary',
      'countRequestWithdraw',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
    );
    await queryInterface.removeColumn('history_summary', 'bankTopup');
    await queryInterface.removeColumn('history_summary', 'momoTopup');
    await queryInterface.removeColumn('history_summary', 'cardTopup');
    await queryInterface.removeColumn('history_summary', 'bankWithdraw');
  },

  down: async (queryInterface, Sequelize) => {
  },
};
