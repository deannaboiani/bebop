const express = require('express');
const router = express.Router();
const userController = require("./api/userController")

router.use("/api",apiRoutes)
// router.use("/",frontEndRoutes)
router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;