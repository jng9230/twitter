import React, { useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Dock from '../components/Dock'
import { Tweet, User } from '../utils/APITypes'
const Profile = () => {
  const user1: User = {
    userID: "",
    displayName: "bing bong bing",
    uniqueName: "realBingBong",
    profileImg: "https://pbs.twimg.com/profile_images/1644390638912434176/AuiHnex3_400x400.jpg"
  }
  const [allTweets, setAllTweets] = useState<Tweet[]>([
    {
      user: user1,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 13123,
      retweets: 123,
      replies: [],
      time: new Date(),
      tweetID: "1"
    }, {
      user: user1,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: "2"
    }
    
  ])
  const handleAddTweet = (tweet: Tweet) => {
    setAllTweets([tweet,...allTweets])
  }
  const [user, setUser] = useState<User>()
  return (
    <>
      <Header/>
      <Timeline allTweets={allTweets}/>
      <Dock allTweets={allTweets} handleAddTweet={handleAddTweet} user={user1}/>
    </>
  )
}

export default Profile
