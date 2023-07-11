const router = require("express").Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const config = require("../config")
const debug = config.DEBUG === "1"; 
const reverseChronoSort = require("../utils/reverseChronoSort")

//generate tweets for homepage (reverse chrono timeline)
router.get("/home/:id", async (req, res) => {
    if (debug) console.log(`GETTING HOMEPAGE FOR ${req.params.id}`)

    const user = await User.findById(req.params.id)

    //get tweets for person that user is following
    let tweets = []
    user.following.map(async (id) => {
        const tweets_for_user = await Tweet.find({ user: id })
            .sort({ time: -1 })
            // .limit(20)
        tweets.push(tweets_for_user)
    })

    tweets = reverseChronoSort(tweets)
    return res.json(tweets)
})

//generate tweets for given profile
router.get("/user/:id", async (req, res) => {
    if (debug) console.log(`GETTING TWEETS FOR USER ${req.params.id}`)

    const tweets = await Tweet.find({ user: req.params.id })
        .sort({ time: -1 })
        // .limit(20)
    return res.json(tweets)
})

//generate the tweet chain -- return children of given tweet
// router.get("/tweet/:id")

module.exports = router