const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
const config = require("../config")
require('../passport-setup/google-setup');
require("../passport-setup/local-setup")
const CLIENT_HOME_PAGE_URL = config.CLIENT_HOME_PAGE_URL;
const debug = config.DEBUG === "1";

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

router.get("/guest",
    passport.authenticate("anonymId"),
    function (req, res) {
        if (req.user) {
            res.redirect(CLIENT_HOME_PAGE_URL)
        }
    }
);

// redirect to home page after successfully login via google
router.get('/google/redirect', passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    // session: false
}),
    function (req, res) {
        res.redirect(CLIENT_HOME_PAGE_URL)
    }
);

module.exports = router;