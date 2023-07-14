import React, { useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Dock from '../components/Dock'
import { Tweet, User } from '../utils/APITypes'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { initTweets as allTweets1 } from '../utils/localTestVars'
import ReccomendationBox from '../components/ReccomendationBox'
import Searchbar from '../components/Searchbar'
const Profile = ({
  user,
  showSidebar,
  handleHideSidebar,
  handleShowSidebar
}:{
  user: User,
  showSidebar: boolean,
  handleHideSidebar: () => void,
  handleShowSidebar: () => void
}) => {
  const [allTweets, setAllTweets] = useState<Tweet[]>(allTweets1)
  const handleAddTweet = (tweet: Tweet) => {
    setAllTweets([tweet,...allTweets])
  }
  const profileID = useParams().profileID;

  return (
    <div className="w-screen h-screen">
      {/* <div className="max-w-screen-2xl flex basis-auto mx-auto gap-3"> */}
      <div className="max-w-screen-2xl grid grid-cols-4 gap-3 mx-auto">
        <div className="">
            <Sidebar user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar}/>
        </div>
        <div className="col-span-2">
          <Header user={user} numTweets={allTweets.length} profileID={profileID} handleShowSidebar={handleShowSidebar}/>
            <Timeline allTweets={allTweets}/>
          {/* <Dock allTweets={allTweets} handleAddTweet={handleAddTweet} user={user}/> */}
        </div>
        <div className="w-full">
            <Searchbar/>
            <ReccomendationBox/>
        </div>
      </div>
    </div>
  )
}

export default Profile
