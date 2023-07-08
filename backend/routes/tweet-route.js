const router = require("express").Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const config = require("../config")
const debug = config.DEBUG === "1"; 
const reverseChronoSort = require("../utils/reverseChronoSort")

//get a tweet
router.get("/id/:id", async (req, res) => {
    if (debug) console.log(`GETTING SPEC. TWEET ${req.params.id}`)

    const tweet = await Tweet.findById(req.params.id)
    return res.json(tweet)
})

//get the replies for a given tweet
router.get("/children/:id", async (req, res) => {
    if (debug) console.log(`GETTING CHILDREN OF ${req.params.id}`)

    let children = []
    const parent = await Tweet.findById(req.params.id)
    parent.replies.map(async (id) => {
        const child = Tweet.findById(id)
        children.push(child)
    })
    
    children = reverseChronoSort(children)
    return res.json(children) //ASSUME SMALL DATA SIZE
})

//create a tweet
router.post("/create", async (req, res) => {
    if (debug) console.log(`CREATING TWEET: ${req.body}`)
    const tweet = new Tweet({
        user: req.body.user,
        text: req.body.text,
        time: new Date(),
    })
    await tweet.save()

    return res.json(tweet)
})

//reply to a tweet
router.post("/reply", async (req, res) => {
    if (debug) console.log(`REPLYING: ${req.body}`)

    const reply = new Tweet({
        user: req.body.user,
        text: req.body.text,
        time: new Date(),
        parent: req.body.parent
    })
    await reply.save()
    await Tweet.findOneAndUpdate(
        { _id: req.body.parent},
        { $push: {replies: reply._id}}
    )
    return res.json(reply)
})

//delete a tweet
router.delete("/", async (req, res) => {
    if (debug) console.log(`DELETING TWEET: ${req.body}`)

    const del_tweet = await Tweet.findById(req.body.child)
    const udpdate_parents = await Tweet.updateOne({ _id: req.body.parent }, {
        $pullAll: {
            replies: [{ _id: req.body.child }],
        },
    });

    return res.json(del_tweet)
})

module.exports = router