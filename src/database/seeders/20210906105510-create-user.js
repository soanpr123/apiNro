'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      username: 'admin',
      type: 'admin',
      password: 'CpwBMgoU/VGqCrxN9SQBh2ZyreqblHO0S2g7Kg4WY24=',
      hotline: '',
      fullName: 'admin',
      description: '',
      expirationDate: new Date(),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
