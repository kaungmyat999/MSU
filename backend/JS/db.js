const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.TABLENAME,process.env.DBNAME,process.env.DBPASS,{
  host: process.env.DBHOST,
  dialect: process.env.DBTYPE,
  port : process.env.DBPORT
})

async function test(){
  try {
    
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test()



module.exports = sequelize