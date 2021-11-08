const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const postRoutes = require("./postRoutes");
router.use("/posts",postRoutes);

const profileRoutes = require("./profileRoutes");
router.use("/profiles", profileRoutes);

const bandsRoutes = require("./bands2");
router.use("/bands", bandsRoutes)


module.exports = router;