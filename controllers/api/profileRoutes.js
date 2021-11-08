const express = require("express");
const router = express.Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
    User.findAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
        if(user) {
            res.json(user);
        } else {
            res.status(404).json({err: "No just profile found!"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});


// if artist name == name from api, fetch name, image, upcoming shows(date and location)
// seeded to db --- top six column in user has value of artist 


module.exports = router;