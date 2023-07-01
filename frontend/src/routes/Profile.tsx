import React, { useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Dock from '../components/Dock'
import { Tweet, User } from '../utils/APITypes'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
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
  const [allTweets, setAllTweets] = useState<Tweet[]>([
    {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 13123,
      retweets: 123,
      replies: [],
      time: new Date(),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }, {
      user: user,
      text: "tweet text 123 nerf draven please mort dog peepocry",
      likes: 12313123,
      retweets: 123,
      replies: [],
      time: new Date(1),
      tweetID: Math.floor(Math.random() * 100000000000).toString()
    }
    
  ])
  const handleAddTweet = (tweet: Tweet) => {
    setAllTweets([tweet,...allTweets])
  }
  const profileID = useParams().profileID;
  console.log(profileID);
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
