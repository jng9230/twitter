import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Dock from '../components/Dock'
import { Tweet, User } from '../utils/APITypes'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { initTweets as allTweets1 } from '../utils/localTestVars'
import ReccomendationBox from '../components/ReccomendationBox'
import Searchbar from '../components/Searchbar'
import { getProfile, getTimeline } from '../utils/APICalls'
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
  const [allTweets, setAllTweets] = useState<Tweet[]>([])
  const profileID = useParams().profileID;
  console.log(`profileID: ${profileID}`)
  console.log(`userID: ${user.userID}`)
  //get the tweets for profile or user (prio. the profile)
  useEffect(() => {
    // if (profileID) {
    //   console.log("getting profile")
    //   getProfile(profileID)
    //     .then(d => setAllTweets(d))
    // } else {
    //   console.log("getting timeline")
    // }
    getTimeline(user.userID)
      .then(d => console.log(d))
  }, [user, profileID])

  const handleAddTweet = (tweet: Tweet) => {
    setAllTweets([tweet,...allTweets])
  }

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
