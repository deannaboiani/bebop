// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require("axios");
const express = require("express");
const { Artist } = require("../../models");
const router = express.Router();
require("dotenv").config();
const API_KEY = process.env.API_KEY;

// GET ARTIST BY NAME AND SHOW NAME AND IMG FROM API
const getArtist = async (name) => {
    try {
        const resp = await axios.get("https://rest.bandsintown.com/artists/" + name + "/?app_id=" + API_KEY);
        let data = resp.data;
        let result = [];
        
        result.push({
            name: data.name,
            image_id: data.image_url
        });
        
        return result;
    } catch(err) {
        console.log(err);
    } 
}
router.get('/', async (req, res)=> {

    try {
        const bands = await getArtist(req.body.name);
        res.json(bands)
    } catch (err) {
        res.json(err);
    }
});


// GET ARTIST EVENTS BY NAME AND SHOW UPCOMING DATES, VENUES AND LOCATION
const getEvents = async (name) => {
    try {
        const resp = await axios.get("https://rest.bandsintown.com/artists/" + name + "/events/?app_id=" + API_KEY);
        let data = resp.data;
        let result = [];

        data.forEach(event => {
            result.push({
                date: event.datetime,
                location: event.venue.location
            });
        });

        return result;
    } catch(err) {
        console.log(err);
    }
}
router.get('/events', async (req, res)=> {

    try {
        const bands = await getEvents(req.body.name);
        res.json(bands)
    } catch (err) {
        res.json(err);
    }
});




module.exports=router;