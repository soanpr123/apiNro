'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('m_bank', 'order', { type: Sequelize.INTEGER, allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('m_bank', 'order', { type: Sequelize.INTEGER, allowNull: true });
  },
};
