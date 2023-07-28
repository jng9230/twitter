import { config } from "./config"
import * as API from "./APITypes"

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
    console.log(email, password, username)
    const res = fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "username": username.trim(),
            "password": password
        })
    })  
        .then(res => {
            console.log(res)
            if (res.status === 200) return res.json()
            if (res.status === 400) throw new Error("Missing fields");
            if (res.status === 409) throw new Error("Email already in use.");
            if (res.status === 500) throw new Error("Internal server error");
        })
        .then(data => {
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
        .then(res => {
            console.log(res)
            if (res.status === 200) return res.json()
            if (res.status === 401) throw new Error("Invalid email and/or password");
            if (res.status === 500) throw new Error("Internal server error");
        })
        .then(data => {
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
    // const res = fetch("/auth/login/success")
    const res = fetch(`/timeline/home/${userID}`)
        .then(res => {
            if (res.ok) {
                return res
            }
            console.log(res.status)
            console.log(res)
            throw new Error("something went wrong")
        })
        .then(res => res.json())
        .then(data => {
            return data.map((d: API.Tweet) => {
                return d
            })
        })
    return res
}

export const getProfile = async (
    handle: string
) => {
    const res = fetch(`/timeline/user/${handle}`, {
        method: "GET",
    })
        .then(res => {
            if (res.ok) {
                return res
            }
            console.log(res.status)
            console.log(res)
            throw new Error("something went wrong")
        })
        .then(res => res.json())
        .then(data => {
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
            return data.map(d => {
                return d
            }) as API.User[]
        })
    return res
}

export const getTweet = (tweetID: string) => {
    const res = fetch(`/tweet/id/${tweetID}`, {
        method: "GET",
    })
        .then(res => {
            if (res.ok){
                return res
            }
            console.log(res.status)
            console.log(res)
            throw new Error("something went wrong")
        })
        .then(res => res.json())
        .then((data: API.Tweet) => {
            return data
        })
    return res
}

export const replyToTweet= (text:string, parent: API.Tweet, user: API.User) => {
    const res = fetch(`/tweet/reply/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": user._id,
            "text": text,
            "parent": parent._id
        })
    })
        .then(res => res.json())
        .then((data: API.Tweet) => {
            return data
        })
    return res
}