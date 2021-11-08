const nodemailer = require('nodemailer')
const express = require('express');
const router = express.Router();
const { User, Artist, Show } = require('../../models');
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll({
        include: [Artist]
    }).then(dbUsers => {
        if (dbUsers.length) {
            res.json(dbUsers)
        } else {
            res.status(404).json({ message: "No users found!" })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err })
    })
})

// SIGNUP USER ****
router.post("/", (req, res) => {
    // const encryptedPassword = bcrypt.hashSync(req.body.password,3);
    User.create({
        username: req.body.username,
        // password:encryptedPassword,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city
    }).then(newUser => {
        req.session.user = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        };
        res.json(newUser);
    }).then(newUser => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'appbebop60@gmail.com',
                pass: 'bebopmusic'
            }
        });
        let mailOptions = {
            from: 'appbebop60@gmail.com',
            to: req.body.email,
            subject: `Welcome to Bebop, ${req.body.username}!`,
            text: `Bebop is a social network tool that brings live music lovers closer than ever! To see where your favorite artists are playing next, click on their image on your profile page. This will bring you to their page where you can interact with other users and plan upcoming shows! See what other artists users listen to by going to their profile. Who knows, you might find your next new favorite artist!`
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('email sent')
            }
        })
    })
        .catch(err => {
            console.log(err);
            req.session.destroy(() => {
                res.status(500).json({ err });
            })
        })
});


// LOGIN USER
router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            req.session.destroy()
            res.status(401).json({message:"incorrect email or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    username:foundUser.username,
                    email:foundUser.email,
                    id:foundUser.id
                }
                res.json(foundUser)
                
            } else {
                req.session.destroy()
                res.status(401).json({message:"incorrect email or password"})
            }
        }
    }).catch(err=>{
         console.log(err);
        res.status(500).json(err);
    })
})


router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser)
    })
})

module.exports = router;