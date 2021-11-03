const express = require('express');
const router = express.Router();
const apiRoutes = require('./api')

router.use("/api",apiRoutes)
// router.use("/",frontEndRoutes)
router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;