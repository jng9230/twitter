import React, { useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Dock from '../components/Dock'
import { Tweet, User } from '../utils/APITypes'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { initTweets as allTweets1 } from '../utils/localTestVars'
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
    <div>
      <Header user={user} numTweets={allTweets.length} profileID={profileID} handleShowSidebar={handleShowSidebar}/>
      <Sidebar user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar}/>
      <Timeline allTweets={allTweets}/>
      <Dock allTweets={allTweets} handleAddTweet={handleAddTweet} user={user}/>
    </div>
  )
}

export default Profile
