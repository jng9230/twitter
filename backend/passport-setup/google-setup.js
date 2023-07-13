// require("dotenv").config({ path: "./config.env" });
const config = require("../config")
const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET
const PORT = config.PORT || 5000;
const GOOGLE_REDIRECT_URL = config.GOOGLE_REDIRECT_URL;

const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(e => {
            done(new Error("Failed to deserialize the user"));
        });
});


let passportConfig = {};
passportConfig.clientID = GOOGLE_CLIENT_ID,
passportConfig.clientSecret = GOOGLE_CLIENT_SECRET,
passportConfig.callbackURL = GOOGLE_REDIRECT_URL
passportConfig.passReqToCallback = true
passport.use(new GoogleStrategy(passportConfig,
    async function (request, accessToken, refreshToken, profile, done) {
        User.findOrCreate(
            { email: profile._json.email },
            { 
                email: profile._json.email,
                username: profile.displayName, 
                handle: profile.displayName + parseInt((Math.random() * 1000).toString())
            },
            function (err, user) {
                return done(err, user);
            }
        );
    }
));