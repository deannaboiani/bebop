const express = require("express");
const router = express.Router();
const { Post } = require("../../models");



router.get("/", (req, res) => {
    Post.findAll()
      .then(postData => {
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  });

  router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id)
      .then(singlePost => {
        if (singlePost) {
          res.json(singlePost);
        } else {
          res.status(404).json({ err: "no such review found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  });

router.post("/", (req, res) => {
    const date = new Date().toISOString().slice(0, 10);
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
    
    if (!req.session.user) {
      return res.status(403).json({ err: "login first dood" });
    }
    
    Post.create({
        content: req.body.content,
        post_date: date,
        createdAt: timestamp,
        updatedAt: timestamp,
        UserId: req.body.userId,
        ArtistId: req.body.ArtistId
    })
    .then(newPost => {
        res.json(newPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

module.exports = router;