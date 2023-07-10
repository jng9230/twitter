const path = require('path');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookie_session = require('cookie-session');
const config = require("./config")
const user_routes = require("./routes/user-routes")
const tweet_routes = require("./routes/tweet-routes")
const profile_routes = require("./routes/profile-routes")
const cookie_parser = require("cookie-parser");
const body_parser = require("body-parser");

const COOKIE_KEY = config.COOKIE_KEY;

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

//GOOGLE AUTH
app.use(
    cookie_session({
        name: "google-auth-session",
        keys: [COOKIE_KEY],
        maxAge: 1000 * 60 * 60 * 24 * 7 //time is in ms
    })
);
app.use(cookie_parser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/tweet", tweet_routes);
app.use("/user", user_routes);
app.use("/profile", profile_routes);

//check for auth on home page load
// const auth_check = (req, res, next) => {
//     if (!req.user) {
//         res.status(401).json({
//             authenticated: false,
//             message: "user has not been authenticated"
//         });
//     } else {
//         next();
//     }
// };

app.get("/test", (req, res) => {
    return res.json("hello world")
})

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));


//render the landing page for prod
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });
// console.log(__dirname)

module.exports = app