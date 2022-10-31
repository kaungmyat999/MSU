'use strict';
const {faker} = require('@faker-js/faker')
const date = faker.date.soon()
function up_loop(time){
  
  let data = []
  while(time--){
    data.push ({
      eventId: faker.datatype.number({
        'min': 2,
        'max': 11
      }),
        userId : faker.datatype.number({
          'min': 2,
          'max': 7
      }),
    })
  }
  return data
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return  queryInterface.bulkInsert("user_events",up_loop(10));
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
