'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('system_logs', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      targetName: {
        type: Sequelize.ENUM({ values: ['smsTopup', 'smsWithdraw', 'requestTopup', 'requestWithdraw', 'system', 'callbackTopup', 'callbackWithdraw', 'user'] }),
      },
      message: {
        type: Sequelize.STRING(500),
      },
      type: {
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
    return queryInterface.dropTable('system_logs');
  },
};
