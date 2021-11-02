const sequelize = require("../config/connection");
// const {User,Pet,Group} = require("../models")

// const seed = async ()=>{
//     const userData = await User.bulkCreate([

// }

sequelize.sync({force:true}).then(()=>{
    seed();
})