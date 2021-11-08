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

router.delete('/delete', async (req, res, next) => {
    let artist = await Artist.findOne({where: {id: req.params.artistId}}).catch(e => {
       console.log(e.message)
    })
    if (!artist){
      console.log("err");
    }
    artist.destroy();
    res.console.log("deleted");
  });

module.exports = router;