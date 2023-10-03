'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM({ values: ['admin', 'user'] }),
        defaultValue: 'user',
      },
      password: {
        type: Sequelize.STRING,
      },
      hotline: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT, allowNull: true,
      },
      expirationDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM({ values: ['inactive', 'active'] }),
        defaultValue: 'inactive',
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

  down: async (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
