// const request = require("supertest");
// require("dotenv").config({ path:"./config.env" });
const config = require("../config")
const mongoose = require('mongoose');
//connect to DB
const PORT = config.PORT || 5001;
const URI = config.ATLAS_URI;
console.log(URI)
const request = require("supertest")
const base_url = `http://localhost:${config.PORT}`
const API = request(base_url)
const User = require("../models/user")
const Tweet = require("../models/tweet")

async function dropAllCollections() {
    await User.deleteMany()
    await Tweet.deleteMany()
        
    // const collections = Object.keys(mongoose.connection.collections)
    // console.log(collections)
    // for (const collectionName of collections) {
    //     const collection = mongoose.connection.collections[collectionName]
    //     try {
    //         await collection.drop()
    //         // await collection.deleteMany();
    //     } catch (error) {
    //         // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
    //         // Safe to ignore. 
    //         if (error.message === 'ns not found') return

    //         // This error happens when you use it.todo.
    //         // Safe to ignore. 
    //         if (error.message.includes('a background operation is currently running')) return

    //         console.log(error.message)
    //     }
    // }
}

beforeAll((done) => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("DB connected") })
        .catch(e => console.log(e))
        .finally(() => done())
});

// beforeEach(async () => {
//     await dropAllCollections()
// })

describe("users", () => {
    beforeAll(async () => {
        await dropAllCollections();
    })

    it("creates a user", async () => {
        const body = {
            email: "test@gmail.com",
            username: "itsa me",
            handle: "woooo",
        }
        const res = await API.post("/user/create").send(body);
        expect(res.body.email).toEqual("test@gmail.com");
        expect(res.body.username).toEqual("itsa me");
        expect(res.body.handle).toEqual("woooo");
        expect(res.body.following).toEqual([]);
        expect(res.body.followers).toEqual([]);
    })

    it("gets a user", async () => {
        const body = {
            email: "test1@gmail.com",
            username: "itsa me",
            handle: "woooo11",
        }
        const create_user = await API.post("/user/create").send(body);
        const get_user = await API.get(`/user/id/${create_user.body._id}`)
        expect(get_user.body.email).toEqual(body.email)
        expect(get_user.body.username).toEqual(body.username)
        expect(get_user.body.handle).toEqual(body.handle)
        expect(get_user.body.following).toEqual(get_user.body.following);
        expect(get_user.body.followers).toEqual(get_user.body.followers);
    })

    it("follows a user", async () => {
        const body_ee = {
            email: "test32@gmail.com",
            username: "itsa me",
            handle: "test32",
        }
        const followee = await API.post("/user/create").send(body_ee);
        const body_er = {
            email: "test33@gmail.com",
            username: "itsa me",
            handle: "test33",
        }
        const follower = await API.post("/user/create").send(body_er);
        const follow_rq = await API.post("/user/follow").send({
            followee: followee.body._id,
            follower: follower.body._id
        })
        expect(follow_rq.body.followee._id).toEqual(followee.body._id)
        expect(follow_rq.body.follower._id).toEqual(follower.body._id)

        //get the users and check that their fields have correctly updated
        const check_ee = await API.get(`/user/id/${followee.body._id}`)
        expect(check_ee.body.followers.length).toEqual(1)
        expect(check_ee.body.following.length).toEqual(0)
        expect(check_ee.body.followers[0]).toEqual(follower.body._id)

        const check_er = await API.get(`/user/id/${follower.body._id}`)
        expect(check_er.body.followers.length).toEqual(0)
        expect(check_er.body.following.length).toEqual(1)
        expect(check_er.body.following[0]).toEqual(followee.body._id)
    })

    it("unfollows a user", async () => {
        //set up the follow
        const body_ee = {
            email: "test42@gmail.com",
            username: "itsa me",
            handle: "test42",
        }
        const followee = await API.post("/user/create").send(body_ee);
        const body_er = {
            email: "test43@gmail.com",
            username: "itsa me",
            handle: "test43",
        }
        const follower = await API.post("/user/create").send(body_er);
        const follow_rq = await API.post("/user/follow").send({
            followee: followee.body._id,
            follower: follower.body._id
        })

        //unfollow and check
        const unfollow_rq = await API.post("/user/unfollow").send({
            followee: followee.body._id,
            follower: follower.body._id
        })
        expect(unfollow_rq.body.followee._id).toEqual(followee.body._id)
        expect(unfollow_rq.body.follower._id).toEqual(follower.body._id)

        //get the users and check that their fields have correctly updated
        const check_ee = await API.get(`/user/id/${followee.body._id}`)
        expect(check_ee.body.followers.length).toEqual(0)
        expect(check_ee.body.following.length).toEqual(0)

        const check_er = await API.get(`/user/id/${follower.body._id}`)
        expect(check_er.body.followers.length).toEqual(0)
        expect(check_er.body.following.length).toEqual(0)
    })
})

describe("tweets", () => {
    const user_body = {
        email: "tweet@gmail.com",
        username: "itsa me",
        handle: "tweet12",
    }
    let user_id;
    beforeAll( async () => {
        await dropAllCollections();

        //make a user to tweet with
        const res = await API.post("/user/create").send(user_body);
        user_id = res.body._id
    })

    it("creates a tweet", async() => {
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const res = await API.post("/tweet/create").send(body)
        expect(res.body.user._id).toEqual(user_id)
        expect(res.body.text).toEqual(body.text)
    })

    it("gets a tweet", async () => {
        //make a tweet
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const res = await API.post("/tweet/create").send(body)

        //get the tweet
        const get_tweet = await API.get(`/tweet/id/${res.body._id}`)
        expect(get_tweet.body.user._id).toEqual(user_id)
        expect(get_tweet.body.text).toEqual(body.text)
    })
    
    
    it("replies to a tweet", async () => {
        //make a tweet
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const res = await API.post("/tweet/create").send(body)

        //reply to above tweet
        const reply_body = {
            user: user_id, 
            text: "reply reply 123",
            parent: res.body._id
        }
        const reply = await API.post("/tweet/reply").send(reply_body)
        //check that the reply was made into a tweet
        expect(reply.body.parent).toEqual(res.body._id)
        expect(reply.body.user._id).toEqual(user_id)
        expect(reply.body.text).toEqual(reply_body.text)

        //check that that parent tweet has the reply as a child
        const parent = await API.get(`/tweet/id/${res.body._id}`)
        expect(parent.body.replies.length).toEqual(1)
        expect(parent.body.replies[0]).toEqual(reply.body._id)
    })
    
    it("gets the single reply for a tweet", async () => {
        //make a tweet parent and tweet child
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const parent = await API.post("/tweet/create").send(body)
        const reply_body = {
            user: user_id,
            text: "reply reply 123",
            parent: parent.body._id
        }
        const reply = await API.post("/tweet/reply").send(reply_body)

        //get the reply for the parent
        const replies = await API.get(`/tweet/children/${parent.body._id}`)
        expect(replies.body.length).toEqual(1)
        expect(replies.body[0]._id).toEqual(reply.body._id)
    })

    it("gets the sorted replies for a tweet", async () => {
        //make a tweet parent and multiple children
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const parent = await API.post("/tweet/create").send(body)
        const reply_body = {
            user: user_id,
            text: "first",
            parent: parent.body._id
        }
        const reply = await API.post("/tweet/reply").send(reply_body)
        const reply_body1 = {
            user: user_id,
            text: "second",
            parent: parent.body._id
        }
        const reply1 = await API.post("/tweet/reply").send(reply_body1)
        const reply_body2 = {
            user: user_id,
            text: "third",
            parent: parent.body._id
        }
        const reply2 = await API.post("/tweet/reply").send(reply_body2)

        //check the replies are in reverse chrono order
        const replies = await API.get(`/tweet/children/${parent.body._id}`)
        expect(replies.body.length).toEqual(3)
        expect(replies.body[0]._id).toEqual(reply2.body._id)
        expect(replies.body[1]._id).toEqual(reply1.body._id)
        expect(replies.body[2]._id).toEqual(reply.body._id)
    })

    it("deletes a tweet", async () => {
        //make a tweet
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const res = await API.post("/tweet/create").send(body)

        //delete it
        const del = await API.delete(`/tweet/id/${res.body._id}`)
        expect(del.body.deleted._id).toEqual(res.body._id)
    })

    it("deletes a reply", async () => {
        //make a tweet and reply to it
        const body = {
            user: user_id,
            text: "testing testing 123"
        }
        const parent = await API.post("/tweet/create").send(body)
        const body1 = {
            user: user_id,
            text: "reply reply 123",
            parent: parent.body._id.toString()
        }
        const reply = await API.post("/tweet/reply").send(body1)
        const del = await API.delete(`/tweet/id/${reply.body._id}`)
        expect(del.body.deleted._id).toEqual(reply.body._id)
        expect(del.body.updated_parent._id).toEqual(parent.body._id)

        //check that parent's replies were updated
        const parent_after = await API.get(`/tweet/id/${parent.body._id}`)
        expect(parent_after.body.replies.length).toEqual(0)
    })
})

describe("profiles/landing pages", () => {
    let users = []
    const tweets_per_user = 5
    const num_users = 4
    beforeAll(async () => {
        await dropAllCollections();
        //make some users
        let user_bodies = []
        for (let i = 0; i < num_users; i ++){
            const user_body1 = {
                email: `${parseInt(Math.random() * 1000)}@gmail.com`,
                username: "itsa me",
                handle: `user${parseInt(Math.random() * 1000)}`
            }
            user_bodies.push(user_body1)
        }
        await Promise.all(
            user_bodies.map(async (d) => {
                const user = await API.post("/user/create").send(d);
                users.push(user.body);
            })
        )
        console.log(users)
        
        //tweet from each user
        await Promise.all(
            users.map( async (d) => {
                for (let j = 0; j < tweets_per_user; j ++){
                    await API.post("/tweet/create").send({
                        user: d._id,
                        text: `${d._id} says: testing testing 123`
                    })
                }
            })
        )

        //have the first user follow all other users
        const others = users.slice(1, users.length)
        await Promise.all(
            others.map(async d => {
                const follower = users[0]
                const followee = d
                await API.post("/user/follow").send({
                    follower: follower._id,
                    followee: followee._id
                })
            })
        )


    })

    it("gets a homepage", async () => {
        const res = await API.get(`/timeline/home/${users[0]._id}`)
        const home_tweets = res.body;
        //check that the number of tweets match
        expect(home_tweets.length).toEqual( (num_users - 1) * tweets_per_user)

        //check that they are ordered wrt date
        const first_time = new Date(home_tweets[0].time)
        const last_time = new Date(home_tweets[home_tweets.length - 1].time)
        expect(last_time.getTime()).toBeLessThan(first_time.getTime())
    })

    it("gets a profile page", async () => {
        const res = await API.get(`/timeline/user/${users[0]._id}`)
        const tweets = res.body

        //make sure all the tweets are for the same profile
        for (const tweet of tweets){
            expect(tweet.user._id).toEqual(users[0]._id)
        }

        //make sure tweets are in reverse chrono order
        const first_time = new Date(tweets[0].time)
        const last_time = new Date(tweets[tweets.length - 1].time)
        expect(last_time.getTime()).toBeLessThan(first_time.getTime())
    })
})


afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
})