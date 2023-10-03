'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'account_bank',
      'partnerPrefix',
      {
        type: Sequelize.STRING(255),
        default: 'NAPnap',
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'account_bank',
      'partnerPrefix',
      {
        type: Sequelize.STRING(255),
        default: 'NAPnap',
        allowNull: true,
      },
    );
  },
};
