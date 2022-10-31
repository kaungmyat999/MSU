const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db.js');
const Events = require('./Event.js');
const Users = require('./User.js');



const User_Events = sequelize.define('user_events',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    }
},{timestamps:false});

Events.belongsToMany(Users,{
    through: "user_events"})
    
Users.belongsToMany(Events,{through: "user_events"})

sequelize.sync()

module.exports= User_Events



