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
    if (debug) { console.log(`MAKING USER:`); console.log(req.body) }


    const user = new User({
        email: req.body.email,
        username: req.body.username,
        handle: req.body.handle, 
        profileImg: req.body.profileImg,
    })

    user.save()
    return res.json(user)
})

//follow
router.post("/follow", async (req, res) => {
    if (debug) {console.log("FOLLOWING:"); console.log(req.body)}
    if (!req.body.followee || !req.body.follower){
        return res.json("NO FOLLOWER/FOLLOWEE PROVIDED").status(400)
    }

    const followee = await User.findOneAndUpdate(
        { _id: req.body.followee },
        { $push: { followers: req.body.follower } }
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
    if (!req.body.followee || !req.body.follower) {
        return res.json("NO FOLLOWER/FOLLOWEE PROVIDED").status(400)
    }

    const followee = await User.findOneAndUpdate({ _id: req.body.followee }, {
        $pullAll: {
            followers: [{ _id: req.body.follower }],
        },
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


//edit username

//edit handle

module.exports = router