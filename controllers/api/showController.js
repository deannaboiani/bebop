const express = require('express');
const router = express.Router();
const {Show} = require('../../models');

router.get("/",(req,res)=>{
    Show.findAll().then(dbShow=>{
        if(dbShow.length){
            res.json(dbShow)
        } else {
            res.status(404).json({message:"No show found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/",(req,res)=>{
    Show.create({
        show_date:req.body.show_date,
        show_artist:req.body.show_artist,
        show_location:req.body.show_location
    }).then(newShow=>{
        res.json(newShow);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

module.exports = router;