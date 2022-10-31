'use strict';
const {faker} = require('@faker-js/faker')
const date = faker.date.soon()
function up_loop(time){
  
  let data = []
  while(time--){
    data.push ({
      fullName: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone_no : (Number(faker.phone.number('669######'))),
      gender : faker.name.gender(),
      college : faker.helpers.arrayElements(['Skyline',"De Anza"],1),
      position : faker.helpers.arrayElements(['Staff',"Student"],1),
      createdAt: date,
      updatedAt : date
    })
  }
  return data
}
module.exports = {
  
  async up (queryInterface, Sequelize) {
    
    return  queryInterface.bulkInsert("Users",up_loop(10));
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
