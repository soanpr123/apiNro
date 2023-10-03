'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sms_topup', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      topupId: {
        type: Sequelize.INTEGER,
      },
      content: {
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
      bankBIN: {
        type: Sequelize.STRING(255),
      },
      status: {
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
    return queryInterface.dropTable('sms_topup');
  },
};
