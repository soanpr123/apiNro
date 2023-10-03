'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('account_bank', 'cashOutLimit', { type: Sequelize.INTEGER, allowNull: true, after: 'cashOutNumber' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('account_bank', 'cashOutLimit', { type: Sequelize.INTEGER, allowNull: true });
  },
};
