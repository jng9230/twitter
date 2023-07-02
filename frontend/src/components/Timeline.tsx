import React from 'react'
import TweetBox from './TweetBox'
import { Tweet } from '../utils/APITypes'
const Timeline = ({
  allTweets
}:{
  allTweets: Tweet[]
}) => {
  return (
    <div className="h-screen overflow-scroll divide-y">
      {
        allTweets.map(d => {
          return <TweetBox tweet={d} key={d.tweetID}/>
        })
      }
    </div>
  )
}

export default Timeline
