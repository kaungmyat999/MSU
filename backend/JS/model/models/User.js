const {DataTypes } = require('sequelize')

const sequelize = require('../../db.js');

const Users = sequelize.define('users',{
    fullName : {
        type: DataTypes.STRING,
        allowNull:false
    },
    
    email : {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },

    password : {
        type: DataTypes.CHAR(60),
        allowNull:false
    },

    phone_no : {
        type: DataTypes.CHAR(12),
        allowNull:false
    },

    gender:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    

    college: {
        type:DataTypes.STRING,
        allowNull : false,
    },

    position:   {
        type :DataTypes.STRING,
        allowNull:false
    },

    
    status: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"Pending",
    },

    img : {
        type: DataTypes.BLOB('long'),
        allowNull:false,
    },

    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    }
    
})

Users.sync({alter:true}).then(data => console.log("Doing Sync")).catch(err => (err)? (console.log(err)) : '');

module.exports = Users;

