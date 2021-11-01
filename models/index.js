// user, artist, post
const User = require('./User')
const Artist = require('./Artist')
const Post = require('./Post')


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


module.exports={
    User,
    Artist,
    Post
};