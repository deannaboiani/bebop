const express = require('express');
const router = express.Router();

const userController = require("./api/userController")

const apiRoutes = require('./api')

const frontEndRoutes = require('./frontEndController')

const profileRoutes = require("./api/profileRoutes");

router.use("/api", apiRoutes);
router.use("/", frontEndRoutes);
router.use("/profiles", profileRoutes);
router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;