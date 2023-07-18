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
            "user": user._id,
            "text": text
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data as API.Tweet
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

export const getUserFromHandle = async (
    userID: string
) => {
    const res = fetch(`/user/handle/${userID}`)
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
            return data.user as API.User
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
            return data.map((d: API.Tweet) => {
                return d
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

// export const searchUsers = async (user:string) => {
//     return [{
//         userID: "12312",
//         username: "fakeuser1",
//         handle: "fakeuser1233",
//         profileImg: ""
//     }] as API.User[]
// }

export const followUser = async (follower: API.User["_id"], followee: API.User["_id"]) => {
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
                follower: API.User
                followee: API.User,
            }
        })
    return res
}

export const unfollowUser = async (follower: API.User["_id"], followee: API.User["_id"]) => {
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
                follower: API.User
                followee: API.User,
            }
        })
    return res
}

export const getReccs = async (userID:string) => {
    const res = fetch(`/user/reccs/${userID}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((data: API.User[]) => {
            console.log(data)
            return data.map(d => {
                return d
            }) as API.User[]
        })
    return res
}