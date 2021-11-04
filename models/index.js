// user, artist, post
const User = require('./User')
const Artist = require('./Artist')
const Post = require('./Post')
const Show = require('./Show')


// user has many artists, astists has many users
User.belongsToMany(Artist, {
    through: "UserArtist"
});

Artist.belongsToMany(User, {
    through: "UserArtist"
});

// post has one user
User.hasMany(Post, {
    onDelete:"CASCADE"
});
Post.belongsTo(User);

// post has one artist
Artist.hasMany(Post, {
    onDelete:"CASCADE"
});
Post.belongsTo(Artist);

// user has many shows
User.hasMany(Show, {
    onDelete:"CASCADE"
});
Show.belongsTo(User);


module.exports={
    User,
    Artist,
    Post,
    Show
};