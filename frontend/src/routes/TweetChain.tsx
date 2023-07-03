import React from 'react'
import TweetBox from '../components/TweetBox'
import { useParams } from 'react-router-dom'
import { initTweets } from '../utils/localTestVars'
import { Tweet } from '../utils/APITypes'
import ReplyBox from '../components/ReplyBox'
const TweetChain = () => {
  //get the parent tweet
  const parentID = useParams().tweetID
  if (!parentID){
    return <> TWEET NOT FOUND </>
  }

  const parent:Tweet = initTweets.filter((d) => d.tweetID === parentID)[0];
  const children = initTweets.filter((d => parent.replies.has(d.tweetID))) //need to make this a map
  console.log(children)
  return (
    <div className="divide-y">
      <TweetBox tweet={parent} isFocused={true}/> 
      <ReplyBox/>
      {
        children.map(d => <TweetBox tweet={d} key={d.tweetID}/>)
      }
    </div>
  )
}

export default TweetChain
