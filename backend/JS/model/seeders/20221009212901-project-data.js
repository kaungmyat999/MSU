'use strict';

const { faker } = require("@faker-js/faker");

const date = faker.date.soon()
function up_loop(time){
  let data = []
  while(time--){
    data.push ({
      name: faker.name.fullName(),
      hasFinished: faker.datatype.boolean(),
      date: faker.date.soon(),
      lead_by : faker.name.fullName(),
      createdAt : faker.date.soon(),
      updatedAt: faker.date.soon()
    })
  }
  return data
}
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return  queryInterface.bulkInsert("Projects",up_loop(4));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
