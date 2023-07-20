const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport_local_mongoose = require("passport-local-mongoose")
const find_or_create = require('mongoose-findorcreate');

const user_schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "email is required"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    username: {
        type: String,
        required: true, 
    },
    handle: {
        type: String,
        required: true,
        unique: true
    },
    profileImg: {
        type: String
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    num_followers: {
        type: Number,
        default: 0
    },
})

user_schema.plugin(find_or_create);
user_schema.plugin(passport_local_mongoose, { usernameField: "email" });

const User = mongoose.model("User", user_schema);

module.exports = User;