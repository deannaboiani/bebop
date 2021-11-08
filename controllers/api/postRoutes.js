const express = require("express");
const router = express.Router();
const { Post } = require("../../models");

router.delete("/:id", async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.status(204).send("No Content");
});

router.post("/", (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  Post.create({
    content: req.body.content,
    post_date: date,
    createdAt: timestamp,
    updatedAt: timestamp,
    UserId: req.session.user.id,
    ArtistId: req.body.ArtistId,
  })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;