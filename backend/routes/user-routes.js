const router = require("express").Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const config = require("../config");
const hasFields = require("../utils/hasFields");
const debug = config.DEBUG === "1";

//get user from id
router.get("/id/:id", async (req, res) => {
    if (debug) console.log(`GETTING USER: ${req.params.id}`)

    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    try {
        const user = await User.findById(req.params.id)
        if (!user){ throw Error("user not found") }

        return res.json(user)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//get user from handle
router.get("/handle/:id", async (req, res) => {
    if (debug) console.log(`GETTING USER: ${req.params.id}`)

    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    try {
        const user = await User.findOne({ handle: req.params.id })
        if (!user) { throw Error("user not found") }

        return res.json(user)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})


//create user **FOR CREATING USERS IN TESTS**
router.post("/create", async (req, res) => {
    if (debug) { console.log(`MAKING USER:`); console.log(req.body) }

    if (!hasFields(req.body, ["email", "username", "handle", "profileImg"])){
        return res.status(400).json("missing fields")
    }

    try {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            handle: req.body.handle, 
            profileImg: req.body.profileImg,
        })
    
        user.save()
        return res.json(user)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//register user
router.post("/register", async (req, res) => {
    if (debug) { console.log("REGISTERING"); console.log(req.body) }

    if (!hasFields(req.body, ["email", "username", "handle"])) {
        return res.status(400).json("missing fields")
    }

    User.register( new User({
        email: req.body.email,
        username: req.body.username,
        handle: req.body.handle,
    }),
        req.body.password,
        function (err, user){
            if (err) { return res.json({ success: false, message: err }) } 

            req.login(user, (err) => {
                if (err) { return res.json({ success: false, message: err }) } 
                
                return res.json({
                    success: true,
                    message: "successfully registered user"
                })
            })
    })
})

//follow wrt IDs provided in body (NOT user objects)
router.post("/follow", async (req, res) => {
    if (debug) {console.log("FOLLOWING:"); console.log(req.body)}

    if (!hasFields(req.body, ["follower", "followee"])) {
        return res.status(400).json("missing fields")
    }

    const followee = await User.findOneAndUpdate(
        { _id: req.body.followee },
        { 
            $push: { followers: req.body.follower },
            $inc: { num_followers: 1 }
        }
    );
    const follower = await User.findOneAndUpdate(
        { _id: req.body.follower },
        { $push: { following: req.body.followee } }
    );

    return res.json({
        followee: followee,
        follower: follower
    })
})

//unfollow
router.post("/unfollow", async (req, res) => {
    if (debug) { console.log("UNFOLLOWING:"); console.log(req.body) }

    if (!hasFields(req.body, ["follower", "followee"])) {
        return res.status(400).json("missing fields")
    }

    const followee = await User.findOneAndUpdate({ _id: req.body.followee }, {
        $pullAll: {
            followers: [{ _id: req.body.follower }],
        }
    });
    const follower = await User.findOneAndUpdate({ _id: req.body.follower }, {
        $pullAll: {
            following: [{ _id: req.body.followee }],
        },
    });

    return res.json({
        followee: followee,
        follower: follower
    })
})


//generate most popular people for user to follow
router.get("/reccs/:id", async (req, res) => {
    if (debug) console.log(`GETTING RECCS FOR ${req.params.id}`)

    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    //reccs shouldn't include user themselves and people that are already followed
    try {
        const user = await User.findOne({ _id: req.params.id});
        const temp = await User.find({ _id: {$nin : [req.params.id, ...user.following]}})
            .sort({ num_followers: -1 })
            .limit(5)
        return res.json(temp)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//edit username

//edit handle

module.exports = router