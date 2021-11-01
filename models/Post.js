const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    content: {
        type:DataTypes.TEXT('tiny'),
        allowNull:false,
    },
    user_id: {
        type:DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},
{
    sequelize,
})

module.exports = Post;