'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'topup_request',
        'requestAmount',
        {
          type: Sequelize.INTEGER,
          defaultValue: null,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('topup_request', 'requestAmount'),
    ]);
  },
};
