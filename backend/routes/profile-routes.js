const router = require("express").Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const config = require("../config")
const debug = config.DEBUG === "1"; 
const reverseChronoSort = require("../utils/reverseChronoSort")
const attach_user = require("../utils/attachUser")
//generate tweets for homepage (reverse chrono timeline)
router.get("/home/:id", async (req, res) => {
    if (debug) console.log(`GETTING HOMEPAGE FOR ${req.params.id}`)

    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    try {
        const user = await User.findById(req.params.id)

        //get tweets for person that user is following
        let tweets = []
        await Promise.all(
            user.following.map(async (id) => {
                const user1 = await User.findOne({_id: id})
                //attach the reply if there is one
                const tweets_for_user = await Tweet.find({ user: id })
                    .sort({ time: -1 })
                    // .limit(20)
                const tweets_for_user_with_user_attached = tweets_for_user.map(d => {
                    return attach_user(user1, d)
                })
                tweets.push(...tweets_for_user_with_user_attached)
            })
        )

        tweets = reverseChronoSort(tweets)
        return res.json(tweets)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//generate tweets for given profile
router.get("/user/:id", async (req, res) => {
    if (debug) console.log(`GETTING TWEETS FOR USER ${req.params.id}`)
    
    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    try {
        const user = await User.findOne({ handle: req.params.id})
        const tweets = await Tweet.find({ user: user._id })
            .sort({ time: -1 })
            // .limit(20)
        const tweets_with_user_attached = tweets.map(d => {
            return attach_user(user, d)
        })
        return res.json(tweets_with_user_attached)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})


//generate the tweet chain -- return children of given tweet
// router.get("/tweet/:id")

module.exports = router