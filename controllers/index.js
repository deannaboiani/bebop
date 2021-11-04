const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const userController = require("./api/userController")
=======
const apiRoutes = require('./api')
>>>>>>> dev

router.use("/api",apiRoutes)
// router.use("/",frontEndRoutes)
router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;