const sequelize = require("../config/connection")
const {Artist,Post,Show,User} = require("../models")
const artistData = require("./artist.json")
const postData = require("./post.json")
const showData = require("./show.json")
const userData = require("./user.json")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    const artist = await Artist.bulkCreate(artistData);
    console.log('seeded artists!')
    const user = await User.bulkCreate(userData);
    console.log('seeded users!')
    const post = await Post.bulkCreate(postData);
    console.log('seeded posts!')
    const show = await Show.bulkCreate(showData);
    console.log('seeded shows!')
   
    process.exit(0);
}

seedMe()