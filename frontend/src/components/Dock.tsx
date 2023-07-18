import React from 'react'
import { BiHome, BiSearch, BiPencil } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Tweet, User } from '../utils/APITypes'
const Dock = ({
  user,
  allTweets,
  handleAddTweet
}:{
  user: User
  allTweets: Tweet[],
  handleAddTweet?: (t:Tweet) => void
}) => {
  const [showTweetMaker, setShowTweetMaker] = useState(false);
  return (
    <>
      <div className="w-screen flex items-center justify-around sticky bottom-0 p-3 bg-white">
          <Link to="/">
            <BiHome size={30}/>
          </Link>
          <BiSearch size={30}/>
          {
            showTweetMaker && 
            <button type="button" onClick={() => setShowTweetMaker(true)}
              className="
                absolute 
                -top-16 
                right-5 
                rounded-full 
                bg-twitter-blue 
                p-3 
                text-white
              ">
              <BiPencil size={30}/>
            </button>
          }
      </div>
      {/* {
        showTweetMaker && handleAddTweet && 
          <TweetMaker 
            closeTweetMaker={() => setShowTweetMaker(false)} 
            user={user}
            handleAddTweet={handleAddTweet}
          />
      } */}
    </>
  )
}

export default Dock
