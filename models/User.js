const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [8]
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
        //     isEmail: true
        // }
    },

}, 
{
    sequelize,
    hooks: {
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,5);
            return userObj
        },
        beforeUpdate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,5);
            return userObj
        }
        },
});

module.exports = User;