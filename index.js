const express = require('express');
const sequelize = require("./config/connection.js")
const session = require("express-session");
const exphbs = require('express-handlebars');
const nodemailer = require ('nodemailer')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

// Requiring our models for syncing
// const {User,Pet,Group} = require('./models');
// const routes = require("./controllers");

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home", { layout: false });
  });
  app.get("/signup", function (req, res) {
    res.render("signup", { layout: false });
  });
  app.get("/login", function (req, res) {
    res.render("login", { layout: false });
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

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
// app.use(routes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});

