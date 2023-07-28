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
    replies: Tweet["_id"][], 
    time: Date,
    parent?: Tweet["_id"]
    _id: string,
    liked_by: User["_id"]
}

// export type TweetReturnType = Tweet & {
//     _id: string
// }

export type User = {
    username: string,
    handle: string,
    profileImg: string,
    _id: string,
    following: [],
    followers: [],
    num_following: number,
    num_followers: number,
    liked_tweets: Tweet["_id"][]
}
// export type UserReturnType = User & {
//     _id: string,
//     following: [],
//     followers: [],
//     num_following: number,
//     num_followers: number
// }

// export type UserNetwork = {
//     followers: User[],
//     following: User[]
// }

export type ValidationErrs = {
    arguments?: number,
    message: string,
    validation: string
}

export type APISuccessReturn = {
    success: boolean,
    message: User
}