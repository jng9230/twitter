// export type Tweet = {
//     profileID: string,
//     profileImg: string,
//     displayName: string,
//     uniqueName: string
//     text: string,
//     likes: number,
//     retweets: number,
//     replies: number,
//     time: Date,
//     tweetID: string
// }

// export type User = {
//     userID: string,
//     displayName: string,
//     uniqueName: string,
//     followers: number,
//     following: number
// }

///////////////////////////////////////////////
export type Tweet = {
    user: User,
    text: string,
    likes: number,
    retweets: number,
    replies: Tweet[],
    time: Date,
    tweetID: string,
    parent?: Tweet
}

export type User = {
    userID: string,
    username: string,
    handle: string,
    profileImg: string,
}

export type UserNetwork = {
    followers: User[],
    following: User[]
}