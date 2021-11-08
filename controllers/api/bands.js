const axios = require("axios");

require("dotenv").config();
const API_KEY = process.env.API_KEY;

// Method that returns information about an artist given a name
const getArtist = async (name) => {
    try {
        const url = "https://rest.bandsintown.com/artists/" + name + "/?app_id=" + API_KEY;

        const resp = await axios.get(url);
        let data = resp.data;
        let result = [];

        result.push({
            name: data.name,
            img: data.image_url
        });

        return result;
    } catch(err) {
        console.log(err);
    } 
}

// Method that returns a list of locations and times that an artist will be performing
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

module.exports = {
    getEvents,
    getArtist
};