const router = require("express").Router();
const User = require("../models/user");
const Tweet = require("../models/tweet");
const config = require("../config")
const debug = config.DEBUG === "1"; 
const reverseChronoSort = require("../utils/reverseChronoSort");
const hasFields = require("../utils/hasFields");
const attach_user = require("../utils/attachUser")

//get a tweet
router.get("/id/:id", async (req, res) => {
    if (debug) console.log(`GETTING SPEC. TWEET ${req.params.id}`)

    if (!req.params.id) {
        return res.status(400).json("missing id")
    }
    
    try {
        const tweet = await Tweet.findById(req.params.id)
        const user = await User.findById(tweet.user)
        return res.json(attach_user(user, tweet))
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//get the replies for a given tweet
router.get("/children/:id", async (req, res) => {
    if (debug) console.log(`GETTING CHILDREN OF ${req.params.id}`)
    
    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    try {
        let children = []
        const parent = await Tweet.findById(req.params.id)
        await Promise.all(
            parent.replies.map(async (id) => {
                const child = await Tweet.findById(id.toString())
                children.push(child)
            })
        )
        children = reverseChronoSort(children)
        return res.json(children) //ASSUME SMALL DATA SIZE
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//create a tweet
router.post("/create", async (req, res) => {
    if (debug) {console.log(`CREATING TWEET:`); console.log(req.body)}

    if (!hasFields(req.body, ["user", "text"])){
        return res.status(400).json("missing fields")
    }
    
    try {
        const user = await User.findById(req.body.user);
        console.log(user)
        if (!user) {throw new Error("User DNE")}
        
        const tweet = new Tweet({
            user: req.body.user,
            text: req.body.text,
            time: new Date(),
        })
        await tweet.save()
        
        return res.json(attach_user(user, tweet))
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//reply to a tweet
router.post("/reply", async (req, res) => {
    if (debug) { console.log(`REPLYING:`); console.log(req.body) }

    if (!hasFields(req.body, ["user", "text", "parent"])) {
        return res.status(400).json("missing fields")
    }

    try {
        const user = await User.findById(req.body.user)
        if (!user) { throw Error("user not found") }

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
        return res.json(attach_user(user, reply))
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//delete a tweet
router.delete("/id/:id", async (req, res) => {
    if (debug) { console.log(`DELETING TWEET:}`); console.log(req.params.id) }

    if (!req.params.id) {
        return res.status(400).json("missing id")
    }

    try {
        const del_tweet = await Tweet.findById(req.params.id)
        const updated_parent = await Tweet.findOneAndUpdate({ _id: del_tweet.parent }, {
            $pullAll: {
                replies: [{ _id: req.params.id }],
            },
        });
    
        return res.json({
            deleted : del_tweet,
            updated_parent : updated_parent
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//like a tweet
router.post("/like", async (req, res) => {
    if (debug) { console.log(`LIKING TWEET:`); console.log(req.body) }

    if (!hasFields(req.body, ["user", "tweet"])) {
        return res.status(400).json("missing fields")
    }

    try {
        const tweet = await Tweet.findOneAndUpdate(
            { _id: req.body.tweet },
            {
                $push: { liked_by: req.body.user },
                $inc: { likes: 1 }
            }
        );
        console.log("liked tweet:")
        console.log(tweet)
        const user = await User.findOneAndUpdate(
            { _id: req.body.user },
            { $push: { liked_tweets: req.body.tweet } }
        );
        console.log("liked by:")
        console.log(user)

        //have to RE-GET the new tweet b/c above DOESN'T RETURN UPDATED OBJ
        const tweet_updated = await Tweet.findById(req.body.tweet)
        return res.json(tweet_updated)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

//unlike a tweet
router.post("/unlike", async (req, res) => {
    if (debug) { console.log(`UNLIKING TWEET:`); console.log(req.body) }

    if (!hasFields(req.body, ["user", "tweet"])) {
        return res.status(400).json("missing fields")
    }

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.body.user },
            {
                $pullAll: { liked_tweets: [{ _id: req.body.tweet }] }
            }
        )
        if (!user) { throw Error("user not found") }

        const tweet = await Tweet.findOneAndUpdate(
            { _id: req.body.tweet  }, 
            {
                $pullAll: { liked_by: [{ _id: req.body.user }] },
                $inc: { likes: -1}
            }
        );
        if (!tweet) { throw Error("tweet not found") }
        
        const updated_tweet = await Tweet.findById(req.body.tweet)
        return res.json(updated_tweet)
    } catch (e) {
        console.error(e)
        return res.status(500).json(e)
    }
})

module.exports = router