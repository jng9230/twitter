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
            return data as API.UserReturnType
        })
    return res
}