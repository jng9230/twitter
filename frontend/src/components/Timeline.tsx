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
          // let parent;
          // if (d.parent){
          //   // parent = allTweets.filter(d1 => d1._id === d.parent)[0]
          //   // getTweet(d.parent)
          //   //   .then(d => {
          //   //     parent = d
          //   //   })
          //   }
            return <TweetBox tweet={d} key={d._id} onTimeline={true} user={user} setUser={setUser}/>
        })
      }
    </>
    // </div>
  )
}

export default Timeline
