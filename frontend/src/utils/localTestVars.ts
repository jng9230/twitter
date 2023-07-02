import { User } from "./APITypes"
export const user: User = {
    userID: "",
    username: "bing bong bing",
    handle: "realBingBong",
    profileImg: "https://pbs.twimg.com/profile_images/1644390638912434176/AuiHnex3_400x400.jpg"
}

const chain5 = {
    user: user,
    text: "WORLD",
    likes: 13123,
    retweets: 123,
    replies: [],
    time: new Date(),
    tweetID: "74000303119"
}

const chain4 = {
    user: user,
    text: "O",
    likes: 13123,
    retweets: 123,
    replies: [chain5, ],
    time: new Date(),
    tweetID: "39194232510"
}

const chain3 = {
    user: user,
    text: "L",
    likes: 13123,
    retweets: 123,
    replies: [chain4],
    time: new Date(),
    tweetID: "12442145002"
}

const chain2 = {
    user: user,
    text: "L",
    likes: 13123,
    retweets: 123,
    replies: [chain3],
    time: new Date(),
    tweetID: "31583696722"
}

const chain1 = {
    user: user,
    text: "E",
    likes: 13123,
    retweets: 123,
    replies: [chain2],
    time: new Date(),
    tweetID: "54057407497"
}

const chain = {
    user: user,
    text: "H",
    likes: 13123,
    retweets: 123,
    replies: [chain1],
    time: new Date(),
    tweetID: "54057407497"
}

export const initTweets = [
    chain,
    chain1, 
    chain2, 
    chain3, 
    chain4, 
    chain5,
    {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 13123,
        retweets: 123,
        replies: [],
        time: new Date(),
        tweetID: "Math.floor(Math.random() * 100000000000).toString()"
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: [],
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }

]