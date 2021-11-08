const express = require('express');
const router = express.Router();

const apiRoutes = require('./api')
router.use("/api", apiRoutes);

const frontEndRoutes = require('./frontEndController')
router.use("/", frontEndRoutes);

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;