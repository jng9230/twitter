import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Dock from '../components/Dock'
import { Tweet, User } from '../utils/APITypes'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
// import { initTweets as allTweets1 } from '../utils/localTestVars'
import ReccomendationBox from '../components/ReccomendationBox'
import Searchbar from '../components/Searchbar'
import { getProfile, getTimeline } from '../utils/APICalls'
import TweetMaker from '../components/TweetMaker'
import TweetMakerModal from '../components/modals/TweetMakerModal'
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
  console.log(`PROFILE's profileID: ${profileID}`)
  console.log(`PROFILE's user:`)
  console.log(user)

  //get the tweets for profile or user (prio. the profile)
  useEffect(() => {
    if (profileID) { //specific user -> tweets from that user only
      getProfile(profileID)
        .then(d => setAllTweets(d))
    } else { //no spec. user provided -> timeline
      getTimeline(user._id)
        .then(d => setAllTweets(d))
    }
  }, [user, profileID])

  const handleAddTweet = (tweet: Tweet) => {
    setAllTweets([tweet,...allTweets])
  }
  
  const [tweetModal, setTweetModal] = useState(false)

  return (
    <>
    <div className="w-screen h-screen">
      {/* <div className="max-w-screen-2xl flex basis-auto mx-auto gap-3"> */}
      <div className="max-w-screen-xl grid grid-cols-4 gap-3 mx-auto">
        <div className="">
            <Sidebar user={user} showTweetModal={() => setTweetModal(true)}  showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} at="profile"/>
        </div>
        <div className="col-span-2 border-x-2 profile-main divide-y-2">
          <Header user={user} numTweets={allTweets.length} profileID={profileID} handleShowSidebar={handleShowSidebar}/>
          { !profileID ?
            <TweetMaker user={user} handleAddTweet={handleAddTweet}/>
            : <></>
          } 
          <Timeline allTweets={allTweets}/>
          {/* <Dock allTweets={allTweets} handleAddTweet={handleAddTweet} user={user}/> */}
        </div>
        <div className="w-full px-2 space-y-3 py-2">
            {/* <Searchbar/> */}
            <ReccomendationBox user={user}/>
        </div>
      </div>
    </div>
    {
      tweetModal && <TweetMakerModal user={user} onClick={() => setTweetModal(false)} handleAddTweet={handleAddTweet}/>
    }
    </>
  )
}

export default Profile
