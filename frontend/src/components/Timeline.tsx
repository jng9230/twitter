import React from 'react'
import TweetBox from './TweetBox'
import { Tweet } from '../utils/APITypes'
const Timeline = ({
  allTweets
}:{
  allTweets: Tweet[]
}) => {
  return (
    // <div className="h-screen overflow-scroll divide-y">
    <>
      {
        allTweets.map(d => {
          let parent;
          if (d.parent){
            parent = allTweets.filter(d1 => d1._id === d.parent)[0]
          }
          return <TweetBox tweet={d} key={d._id} onTimeline={true} parentTweet={parent}/>
        })
      }
    </>
    // </div>
  )
}

export default Timeline
