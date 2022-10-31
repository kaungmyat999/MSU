'use strict';
const {faker, FakerError} = require('@faker-js/faker')
function up_loop(time){
  let data = []
  while(time--){
    data.push ({
      name: faker.name.fullName(),
      leadby: faker.name.fullName(),
      location : faker.address.streetAddress(),
      date : faker.date.past(),
      createdAt : faker.date.soon(),
      updatedAt : faker.date.soon(),
    })
  }
  return data
}
const obj = {
  
  
}
module.exports = {
  async up (queryInterface, Sequelize) {
    return  queryInterface.bulkInsert("events",up_loop(10));
    
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
