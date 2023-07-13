import { config } from "./config"
import * as API from "./APITypes"

export const makeTweet = async (profileID: string, text: string) => {

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
            "password": password,
            "handle": username + parseInt((Math.random() * 1000).toString())
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
            throw new Error("failed to authenticate user");
        })
        .then(data => {
            return data.user as API.User
        })
    return res
}

