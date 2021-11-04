const express = require('express');
const router = express.Router();
const {User,Artist} = require('../../models');

router.get("/",(req,res)=>{
    Artist.findAll({
        include:[User]
    }).then(dbArtits=>{
        if(dbArtits.length){
            res.json(dbArtits)
        } else {
            res.status(404).json({message:"No artist found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/",(req,res)=>{
    Artist.create({
        artist_name:req.body.artist_name,
        shows:req.body.shows,
        image_id:req.body.image_id
    }).then(newArtist=>{
        res.json(newArtist);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

module.exports = router;