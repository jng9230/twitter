/** Helper function to attach the given `user` to the `tweet` object.
 * Used for frontend to maintain its types and state.
 */
const attach_user = (user, tweet) => {
    return {
        user: user,
        text: tweet.text,
        likes: tweet.likes,
        retweets: tweet.retweets,
        replies: tweet.replies,
        _id: tweet._id,
        time: new Date(tweet.time),
        parent: tweet.parent || ""
    }
}

module.exports = attach_user