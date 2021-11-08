const express = require("express");
const router = express.Router();
const { User, Artist, Post, Show } = require("../models");
const bands = require("./api/bands");

let aid = "";

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  // if(req.session.user){
  //     return res.redirect(`/profile/${req.session.user.id}`)
  // }
  return res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect(`/profile/${req.session.user.id}`);
  }
  return res.render("login");
});

router.get("/profile", (req, res) => {
    if (req.session.user) {
        return res.redirect(`/profile/${req.session.user.id}`)
    }
    return res.render("login")
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/profile/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Show,
        include: [Artist],
      },
      Artist,
    ],
  }).then((userData) => {
    const hbsData = userData.get({ plain: true });
    console.log(hbsData);
    res.render("profile", hbsData);
  });
});

router.get("/artists", (req, res) => {
  Artist.findAll().then((artistData) => {
    console.log(artistData);
    console.log("=================");
    const hbsAData = artistData.map((item) => item.get({ plain: true }));
    console.log(hbsAData);
    return res.render("artist", {
      flavors: hbsAData,
    });
  });
});

router.get("/artists/:id", (req, res) => {
  Artist.findByPk(req.params.id, {
    include: [
      {
        model: Post,
        include: [User],
      },
      User,
    ],
  }).then((artistData) => {
    const hbsData = artistData.get({ plain: true });
    hbsData.Posts = hbsData.Posts.map((post) => {
      post.canDelete = post.User.username === req.session.user.username;
      return post;
    });
    hbsData.User = req.session.user;
    console.log(hbsData);
    res.render("artist", hbsData);
  });
});

router.post("/artists/search", async (req, res) => {
  let artist = await bands.getArtist(req.body.name);

  Artist.create({
    artist_name: artist[0].name,
    image_id: artist[0].img,
    UserId: req.session.user.id
  })
  .then(async newArtist => {
    const topsix = await Artist.findByPk(newArtist.id);
    await topsix.addUser(req.session.user.id);
    aid = newArtist.id;
    res.json(newArtist);
  })
  .catch(err => {
    console.log(err);
  });
});

router.post("/artists/shows", async (req, res) => {
  let events = await bands.getEvents(req.body.name);
  console.log("EVENTS: #####################");
  console.log(events);

  events.forEach((event) => {
      Show.create({
      show_date: event.date,
      show_venue: event.venue,
      show_location: event.location,
      ArtistId: aid,
      UserId: req.session.user.id
    })
    .catch(err => {
      console.log(err);
    });
  });

  res.json(events);
});

module.exports = router;