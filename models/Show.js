const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Show extends Model { }

Show.init({
    show_date: {
        type:DataTypes.DATE,
        allowNull:false,
        validate: {
            isDate:true
        }
    },
    show_artist: {
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
