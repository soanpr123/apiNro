'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sms_error_logs', 'bankId', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn('sms_error_logs', 'partnerReference', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.addColumn('sms_error_logs', 'transferAmmount', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn('sms_error_logs', 'bankAccNumber', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.addColumn('sms_error_logs', 'bankAccBalance', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn('sms_error_logs', 'type', { type: Sequelize.STRING(255), allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sms_error_logs', 'bankId', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.removeColumn('sms_error_logs', 'partnerReference', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.removeColumn('sms_error_logs', 'transferAmmount', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.removeColumn('sms_error_logs', 'bankAccNumber', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.removeColumn('sms_error_logs', 'bankAccBalance', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.removeColumn('sms_error_logs', 'type', { type: Sequelize.STRING(255), allowNull: true });
  },
};
