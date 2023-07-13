const config = require("../config")

const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy

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
    function (username, password, done) {
        // User.findOne({ username: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        // });
        // User.findOrCreate(
        //     { username: username },
        //     { username: username, email: email },
        //     function (err, user) {
        //         if (!user.verifyPassword(password)) { return done(null, false); }

        //         return done(err, user);
        //     }
        // );
        User.authenticate();
    }
));
