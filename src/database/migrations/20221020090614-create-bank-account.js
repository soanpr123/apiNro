'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('account_bank', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      bankId: {
        type: Sequelize.INTEGER,
      },
      bankAccName: {
        type: Sequelize.STRING(255),
      },
      bankAccNumber: {
        type: Sequelize.STRING(255),
      },
      bankAccBalance: {
        type: Sequelize.INTEGER,
      },
      bankBranchName: {
        type: Sequelize.STRING(255),
      },
      statusTopup: {
        type: Sequelize.STRING(255),
      },
      statusWithdraw: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }, {
      charset: 'utf8mb4',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('account_bank');
  },
};
