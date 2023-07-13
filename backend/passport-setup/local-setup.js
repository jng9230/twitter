const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy

passport.use(User.createStrategy()); //for email > username verification

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

passport.use(new LocalStrategy(
    User.authenticate() //passport-local-mongoose fxn
));
