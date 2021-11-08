const express = require("express");
const router = express.Router();
const { User, Artist, Post, Show } = require("../models");

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
module.exports = router;