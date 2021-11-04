const { Model, DataTypes } = require('sequelize');
const user = require('./User');
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
    // favorited_by: {
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: 'user',
    //         key: 'id'
    //     }
    // }
},
{
    sequelize,
})

module.exports = Artist;