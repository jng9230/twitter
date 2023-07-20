const router = require("express").Router();
const passport = require("passport");
const config = require("../config")
require('../passport-setup/google-setup');
require("../passport-setup/local-setup")
const CLIENT_HOME_PAGE_URL = config.CLIENT_HOME_PAGE_URL;
const debug = config.DEBUG === "1";
const User = require("../models/user");
const hasFields = require("../utils/hasFields");

// when login is successful, retrieve user info
router.get("/login/success",
    function (req, res) {
        if (debug) { console.log("/login/success") }
        if (req.user) {
            if (debug) { console.log(req.user) }
            res.status(200);
            res.json({
                success: true,
                message: "user has successfully authenticated",
                user: req.user,
                cookies: req.cookies
            });
        } else {
            res.status(401);
            res.json({
                success: false,
                message: "user not authenticated",
                user: req.user,
                cookies: req.cookies
            });
            console.log("Error from /login/success: NO USER PROVIDED IN REQ")
        }
    });

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
    // res.redirect("/")
});


router.get("/google",
    passport.authenticate("google", { scope: ['email', 'profile'] }),
);

// router.get("/local",
//     passport.authenticate("local"),
//     function (req, res) {
//         if (req.user) {
//             res.redirect(CLIENT_HOME_PAGE_URL)
//         }
//     }
// );

// redirect to home page after successfully login via google
router.get('/google/redirect', passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    // session: false
}),
    function (req, res) {
        res.redirect(CLIENT_HOME_PAGE_URL)
    }
);

//from https://www.geeksforgeeks.org/node-js-authentication-using-passportjs-and-passport-local-mongoose/
//register user
router.post("/register", async (req, res) => {
    if (debug) { console.log("REGISTERING"); console.log(req.body) }

    if (!hasFields(req.body, ["email", "username", "password"])) {
        return res.status(400).json("missing fields")
    }

    User.register(new User({
        email: req.body.email,
        username: req.body.username,
        handle: req.body.username.trim().replace(/ /g, "") + parseInt((Math.random() * 1000).toString())
    }),
    req.body.password,
    function (err, user) {
        if (err) { console.error(err); return res.status(409).json({ success: false, message: err }) }

        req.login(user, (err) => {
            if (err) { console.error(err); return res.status(500).json({ success: false, message: err }) }

            return res.json({
                success: true,
                message: {
                    _id: user._id,
                    username: user.username,
                    handle: user.handle,
                    profileImg: user.profileImg || ""
                }
            })
        })
    })
})

//login locally 
router.post("/login-local", function (req, res) {
    if (debug){ console.log("LOCAL LOGIN"); console.log(req.body) }
    passport.authenticate("local", function (err, user, info) {
        if (err) { console.log(err); return res.status(500).json({ success: false, message: err.message }) }

        req.login(user, (err) => {
            if (err) { console.log(err); return res.status(401).json({ success: false, message: err.message }) }

            return res.json({
                message: {
                    _id: user._id,
                    username: user.username,
                    handle: user.handle,
                    profileImg: user.profileImg || ""
                }
            })
        })
    })(req, res); 
})

module.exports = router;