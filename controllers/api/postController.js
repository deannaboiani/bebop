const express = require('express');
const router = express.Router();
const {Post} = require('../../models');

router.get("/",(req,res)=>{
    Post.findAll().then(dbPost=>{
        if(dbPost.length){
            res.json(dbPost)
        } else {
            res.status(404).json({message:"No post found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/",(req,res)=>{
    Post.create({
        content:req.body.content,
        post_date:req.body.post_date,
    }).then(newPost=>{
        res.json(newPost);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

module.exports = router;