'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_bank', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      bankFullName: {
        type: Sequelize.STRING(255),
      },
      bankBID: {
        type: Sequelize.STRING(255),
      },
      bankName: {
        type: Sequelize.STRING(255),
      },
      bankCode: {
        type: Sequelize.STRING(255),
      },
      regexTopupAmount: {
        type: Sequelize.STRING(255),
      },
      regexTopupPartnerRef: {
        type: Sequelize.STRING(255),
      },
      regexWithdrawAmount: {
        type: Sequelize.STRING(255),
      },
      regexWithdrawTransId: {
        type: Sequelize.STRING(255),
      },
      statusShowWithdraw: {
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
    return queryInterface.dropTable('m_bank');
  },
};
