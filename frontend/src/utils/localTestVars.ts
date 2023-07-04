import { Tweet, User } from "./APITypes"
export const user: User = {
    userID: "",
    username: "bing bong bing",
    handle: "realBingBong",
    profileImg: "https://pbs.twimg.com/profile_images/1644390638912434176/AuiHnex3_400x400.jpg"
}

const chain5:Tweet = {
    user: user,
    text: "WORLD",
    likes: 13123,
    retweets: 123,
    replies: new Set<Tweet["tweetID"]>(),
    time: new Date(),
    tweetID: "74000303119",
    parent: "39194232510"
}

const chain4:Tweet = {
    user: user,
    text: "O",
    likes: 13123,
    retweets: 123,
    replies: new Set([chain5.tweetID]),
    time: new Date(),
    tweetID: "39194232510",
    parent: "12442145002"
}

const chain3 = {
    user: user,
    text: "L",
    likes: 13123,
    retweets: 123,
    replies: new Set([chain4.tweetID]),
    time: new Date(),
    tweetID: "12442145002",
    parent: "31583696722"
}

const chain2 = {
    user: user,
    text: "L",
    likes: 13123,
    retweets: 123,
    replies: new Set([chain3.tweetID]),
    time: new Date(),
    tweetID: "31583696722",
    parent: "5405740749712"
}

const chain1:Tweet = {
    user: user,
    text: "E",
    likes: 13123,
    retweets: 123,
    replies: new Set([chain2.tweetID]),
    time: new Date(),
    tweetID: "5405740749712",
    parent: "54057407496"
}

const chain:Tweet = {
    user: user,
    text: "H",
    likes: 13123,
    retweets: 123,
    replies: new Set([chain1.tweetID]),
    time: new Date(),
    tweetID: "54057407496"
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
        text: "ENORMO GLIZZINGTON III",
        likes: 13123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date("6-23-2023"),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    },{
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 13123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
        user: user,
        text: "tweet text 123 nerf draven please mort dog peepocry",
        likes: 12313123,
        retweets: 123,
        replies: new Set<Tweet["tweetID"]>(),
        time: new Date(1),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
    }

]