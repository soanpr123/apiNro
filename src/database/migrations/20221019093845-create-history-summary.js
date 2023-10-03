'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('history_summary', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      bankTopup: {
        type: Sequelize.INTEGER,
      },
      momoTopup: {
        type: Sequelize.INTEGER,
      },
      cardTopup: {
        type: Sequelize.INTEGER,
      },
      bankWithdraw: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('history_summary');
  },
};
