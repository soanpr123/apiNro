'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('m_bank', 'regexIBTopupPartnerRef', { type: Sequelize.STRING(255), allowNull: true, after: 'regexTopupPartnerRefIndex' });
    await queryInterface.addColumn('m_bank', 'regexIBTopupPartnerRefIndex', { type: Sequelize.INTEGER, allowNull: true, after: 'regexTopupPartnerRefIndex' });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('m_bank', 'regexIBTopupPartnerRef', { type: Sequelize.STRING(255), allowNull: true });
    await queryInterface.removeColumn('m_bank', 'regexIBTopupPartnerRefIndex', { type: Sequelize.INTEGER, allowNull: true });
  },
};
