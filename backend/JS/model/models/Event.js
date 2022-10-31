const {DataTypes } = require('sequelize')

const sequelize = require('../../db.js');


const Events = sequelize.define('events',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    leadby:{
        type:DataTypes.STRING,
        allowNull:false,
    }, 
    location: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type:DataTypes.DATE,
        allowNull: false,
    },

    hash:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
    
});
Events.sync({alter:true}).then(data => console.log("Doing Sync")).catch(err => (err)? (console.log(err)) : '');

module.exports = Events;