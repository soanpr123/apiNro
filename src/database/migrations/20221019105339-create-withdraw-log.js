'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('withdraw_log', {
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
      bankAccNumber: {
        type: Sequelize.STRING(255),
      },
      bankAccName: {
        type: Sequelize.STRING(255),
      },
      bankBIN: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('withdraw_log');
  },
};
