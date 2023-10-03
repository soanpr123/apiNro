'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'users',
      'type',
      {
        type: Sequelize.ENUM({ values: ['root', 'admin', 'report', 'mod', 'client'] }),
        defaultValue: 'client',
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'users',
      'type',
      {
        type: Sequelize.STRING(255),
        defaultValue: 'client',
        allowNull: true,
      },
    );
  },
};
