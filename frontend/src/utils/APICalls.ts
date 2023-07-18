import { config } from "./config"
import * as API from "./APITypes"
import { AiOutlineConsoleSql } from "react-icons/ai";

export const makeTweet = async (user: API.User, text: string) => {
    const res = fetch("/tweet/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": user.userID,
            "text": text
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return {
                user: user,
                text: data.text,
                likes: 0,
                retweets: 0,
                replies: [],
                time: new Date(data.time),
                tweetID: data._id,
            } as API.Tweet
        })
    return res
}

export const checkEmailUnique = async (email:string) => {
    return true
}

export const createAccount = async (
    email:string, 
    password: string,
    username: string
) => {
    const res = fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as API.APISuccessReturn
        })
    return res
}

export const loginToAccount = async (
    email: string,
    password: string
) => {
    const res = fetch("/auth/login-local", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": email,
            "password": password,
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as API.APISuccessReturn
        })
    return res
}

export const getUserFromID = async (
    userID: string
) => {
    const res = fetch(`/user/id/${userID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as API.User
        })
    return res
}

export const getAuthedUser = async () => {
    const res = fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
    })
        // const res = fetch("/get_details/?token="+token, {
        // })
        .then(res => {
            if (res.status === 200) return res.json()
            throw ({
                name: "AuthError",
                message: "failed to authenticate user"
            });
        })
        .then(data => {
            return data.user as API.UserReturnType
        })
    return res
}

export const getTimeline = async (
    userID: string
) => {
    // if (!userID){ console.log("fucking off"); return []}
    
    // const res = fetch("/auth/login/success")
    const res = fetch(`/timeline/home/${userID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data.map((d: API.TweetReturnType) => {
                return {
                    user: d.user,
                    text: d.text,
                    likes: d.likes,
                    retweets: d.retweets,
                    replies: d.replies,
                    time: new Date(d.time),
                    tweetID: d._id
                } as API.Tweet
            })
        })
    return res
}

export const getProfile = async (
    userID: string
) => {
    const res = fetch(`/timeline/user/${userID}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as API.Tweet[]
        })
    return res
}

export const searchUsers = async (user:string) => {
    return [{
        userID: "12312",
        username: "fakeuser1",
        handle: "fakeuser1233",
        profileImg: ""
    }] as API.User[]
}

export const followUser = async (follower: API.User["userID"], followee: API.User["userID"]) => {
    const res = fetch(`/user/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "follower": follower,
            "followee": followee,
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as {
                follower: API.UserReturnType
                followee: API.UserReturnType,
            }
        })
    return res
}

export const unfollowUser = async (follower: API.User["userID"], followee: API.User["userID"]) => {
    const res = fetch(`/user/unfollow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "follower": follower,
            "followee": followee,
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as {
                follower: API.UserReturnType
                followee: API.UserReturnType,
            }
        })
    return res
}

export const getReccs = async (userID:string) => {
    const res = fetch(`/user/reccs/${userID}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((data: API.UserReturnType[]) => {
            console.log(data)
            return data.map(d => {
                return {
                    userID: d._id,
                    username: d.username,
                    handle: d.handle,
                    profileImg: d.profileImg
                }
            }) as API.User[]
        })
    return res
}