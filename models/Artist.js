const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init({
    artist_name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    shows: {
        type:DataTypes.DATE,
        validate: {
            isDate:true
        }
    },
    image_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    },
    favorited_by: {
        type:DataTypes.STRING,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},
{
    sequelize,
})

module.exports = Artist;