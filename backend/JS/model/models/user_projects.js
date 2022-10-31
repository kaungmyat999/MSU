const { DataTypes } = require('sequelize');
const sequelize = require('../../db.js');
const Projects = require('./Project.js');
const User = require('./User.js');



const User_Projects = sequelize.define('user_projects',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true,
    }
});

Projects.belongsToMany(User,{through: "user_projects"})
User.belongsToMany(Projects,{through: "user_projects"})

sequelize.sync()
