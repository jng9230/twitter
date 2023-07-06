const router = require("express").Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const config = require("../config")
const debug = config.DEBUG === "1";

//get user
router.get("/id/:id", async (req, res) => {
    if (debug) console.log(`GETTING USER: ${req.params.id}`)

    const user = await User.findById(req.params.id)
    return res.json(user)
})

//create user
router.post("/create", async (req, res) => {
    if (debug) console.log(`MAKING USER: ${req.body}`)

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        handle: req.body.handle, 
        profileImg: req.body.profileImg,
    })

    await user.save()
    return res.json(user)
})

//follow
router.post("/follow", async (req, res) => {
    if (debug) console.log(`FOLLOWING: ${req.body}`)

    const followee = await User.update(
        { _id: req.body.followee },
        { $push: { followers: req.body.follower } }
    );
    const follower = await User.update(
        { _id: req.body.follower },
        { $push: { followers: req.body.followee } }
    );

    return res.json({
        followee: followee,
        follower: follower
    })
})

//unfollow
router.post("/unfollow", async (req, res) => {
    if (debug) console.log(`UNFOLLOWING: ${req.body}`)

    const followee = await User.updateOne({ _id: req.followee }, {
        $pullAll: {
            followers: [{ _id: req.params.follower }],
        },
    });
    const follower = await User.updateOne({ _id: req.follower }, {
        $pullAll: {
            followers: [{ _id: req.params.followee }],
        },
    });

    return res.json({
        followee: followee,
        follower: follower
    })
})


//edit username

//edit handle

module.exports = router