const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Show extends Model { }

Show.init({
    show_date: {
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate: {
            isDate:true
        }
    },
    show_venue: {
        type:DataTypes.STRING,
        allowNull:false
    },
    show_location: {
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize,
});

module.exports=Show;
