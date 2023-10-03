'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('black_list', 'bankAccNumber', { type: Sequelize.STRING(255), allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('black_list', 'bankAccNumber', { type: Sequelize.STRING(255), allowNull: true });
  },
};
