const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const postRoutes = require("./postRoutes");
router.use("/posts",postRoutes);

const profileRoutes = require("./profileRoutes");
router.use("/profiles", profileRoutes);


module.exports = router;