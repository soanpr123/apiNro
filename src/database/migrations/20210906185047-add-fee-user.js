'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'paidFee',
        Sequelize.INTEGER,
      ),
      queryInterface.addColumn(
        'users',
        'pendingFee',
        Sequelize.INTEGER,
      ),
      queryInterface.addColumn(
        'users',
        'totalFee',
        Sequelize.INTEGER,
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'totalFee'),
      queryInterface.removeColumn('users', 'pendingFee'),
      queryInterface.removeColumn('users', 'paidFee'),
    ]);
  },
};
