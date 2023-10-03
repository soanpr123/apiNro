'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'withdraw_request',
        'statusCallback',
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
      queryInterface.removeColumn('withdraw_request', 'statusCallback'),
    ]);
  },
};
