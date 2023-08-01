import React from 'react'
import TweetBox from './TweetBox'
import { Tweet, User } from '../utils/APITypes'
import { getTweet } from '../utils/APICalls'
const Timeline = ({
  allTweets,
  user,
  setUser
}:{
  allTweets: Tweet[],
  user: User,
  setUser: (u: User) => void
}) => {

  return (
    // <div className="h-screen overflow-scroll divide-y">
    <>
      {
        allTweets.map(d => {
            return <TweetBox tweet={d} key={d._id} onTimeline={true} user={user} setUser={setUser}/>
        })
      }
    </>
    // </div>
  )
}

export default Timeline
