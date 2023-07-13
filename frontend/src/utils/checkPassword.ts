import { ValidationErrs } from "./APITypes";
let passwordValidator = require('password-validator');
let validator = require('validator')

const passwordSchema = new passwordValidator()
passwordSchema
    .is().min(6)               
    .is().max(30)              
    .has().uppercase()          
    .has().lowercase()          
    .has().digits(1)            
    .has().not().spaces()
    .has().symbols(1)

export const checkPassword = (password: string) => {
    const res = passwordSchema.validate(password, { details: true }) as ValidationErrs[]
    return res
}

export const checkEmail = (email:string) => {
    return validator.isEmail(email)
}

const usernameSchema = new passwordValidator()
usernameSchema
    .is().min(4)
    .is().max(30)
    .has().not().spaces()
    .has().not().symbols()

export const checkUsername = (username:string) => {
    const res = usernameSchema.validate(username, { details: true }) as ValidationErrs[]
    return res
}
