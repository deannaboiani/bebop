const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init({
    artist_name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    shows: {
        type:DataTypes.DATEONLY,
        validate: {
            isDate:true
        }
    },
    image_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:0
    },
},
{
    sequelize,
})

module.exports = Artist;