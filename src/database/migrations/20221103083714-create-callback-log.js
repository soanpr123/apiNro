'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('callback_logs', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING(500),
      },
      status: {
        type: Sequelize.STRING(255),
      },
      payload: {
        type: Sequelize.TEXT,
      },
      response: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('callback_logs');
  },
};
