const {DataTypes } = require('sequelize')

const sequelize = require('../../db.js')


const Projects = sequelize.define('projects',{
    name: {
        type:DataTypes.STRING,
        allowNull: false,
    },

    hasFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    date: {
        type:DataTypes.DATE,
        allowNull: false,
    },
    lead_by: {
        type:DataTypes.STRING,
        allowNull: false,
    }
})

Projects.sync().then(data => console.log("Doing Sync")).catch(err => (err)? (console.log(err)) : '');


module.exports = Projects;