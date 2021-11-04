const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    content: {
        type:DataTypes.TEXT('tiny'),
    },
    post_date: {
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate: {
            isDate:true
        }
    }},{
    sequelize
})

module.exports = Post;