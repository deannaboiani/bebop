const { Model, DataTypes } = require('sequelize');
const user = require('./User');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init({
    artist_name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    image_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:0
    }
},
{
    sequelize,
})

module.exports = Artist;