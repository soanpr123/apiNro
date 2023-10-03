'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sms_error_logs', 'phoneReceive', { type: Sequelize.STRING(255), allowNull: true, after: 'type' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sms_error_logs', 'phoneReceive', { type: Sequelize.STRING(255), allowNull: true });
  },
};
