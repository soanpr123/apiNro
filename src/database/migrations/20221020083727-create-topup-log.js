'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('topup_request', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      AdminId: {
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.TEXT,
      },
      transferMessage: {
        type: Sequelize.STRING(255),
      },
      transferAmount: {
        type: Sequelize.INTEGER,
      },
      transferId: {
        type: Sequelize.STRING(255),
      },
      partnerReference: {
        type: Sequelize.STRING(255),
      },
      requestId: {
        type: Sequelize.STRING(255),
      },
      bankId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(255),
      },
      statusTransfer: {
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
    return queryInterface.dropTable('topup_request');
  },
};
