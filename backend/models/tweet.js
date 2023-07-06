const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweet_schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    retweets: {
        type: Number,
        default: 0
    },
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet"
    },
    time: Date,
    parent: mongoose.Schema.Types.ObjectId,
})

const Tweet = mongoose.model("Tweet", tweet_schema);

module.exports = Tweet;