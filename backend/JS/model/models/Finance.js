const {DataTypes } = require('sequelize')

const sequelize = require('../../db.js');


const Finance = sequelize.define('finance',{
    date : {
        type: DataTypes.DATE,
        allowNull:false,
    },
    total: {
        type:DataTypes.DOUBLE,
        allowNull: false,
    },

})

Finance.sync().then(data => console.log("Doing Sync")).catch(err => (err)? (console.log(err)) : '');



module.exports = Finance;