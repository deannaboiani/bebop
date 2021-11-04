const express = require('express');
const router = express.Router();
const {User,Artist,Post,Show}  = require("../models")

router.get('/',(req,res)=>{
    return res.render("home")
});


  router.get("/signup", function (req, res) {
    res.render("signup");
  });
  router.get("/login", function (req, res) {
    res.render("login");
  });


router.get("/artists",(req,res)=>{
    Artist.findAll().then(artistData=>{
        console.log(artistData)
        console.log("=================")
        const hbsAData = artistData.map(item=>item.get({plain:true}))
        console.log(hbsAData)
        return res.render("artists/",{
            flavors:hbsAData
        })
    })
})

router.get("/artists/:id",(req,res)=>{
    Artist.findByPk(req.params.id,{
        include:[{
            model:Post,
            include:[User]
        }]
    }).then(artistData=>{
        const hbsData = artistData.get({plain:true})
        console.log(hbsData);
        res.render("artist",hbsData);
    })
})




module.exports = router;