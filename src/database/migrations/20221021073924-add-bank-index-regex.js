'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'm_bank',
        'regexTopupPartnerRefIndex',
        {
          type: Sequelize.INTEGER,
          defaultValue: null,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'm_bank',
        'regexWithdrawTransIdIndex',
        {
          type: Sequelize.INTEGER,
          defaultValue: null,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('m_bank', 'regexTopupPartnerRefIndex'),
      queryInterface.removeColumn('m_bank', 'regexWithdrawTransIdIndex'),
    ]);
  },
};
