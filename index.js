const express = require('express');
const sequelize = require("./config/connection.js")
const session = require("express-session");
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

// Requiring our models for syncing
const {User,Artist,Post,Show} = require('./models');
const routes = require("./controllers");

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home",);
  });
  app.get("/signup", function (req, res) {
    res.render("signup");
  });
  app.get("/login", function (req, res) {
    res.render("login");
  });

// Sets up the Express app to handle data parsing

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 2
     },
     store: new SequelizeStore({
        db:sequelize
     })
  }))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});

