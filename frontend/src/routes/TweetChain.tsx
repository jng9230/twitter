import React, { useEffect, useRef } from 'react'
import TweetBox from '../components/TweetBox'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { initTweets } from '../utils/localTestVars'
import { Tweet, User } from '../utils/APITypes'
import ReplyBox from '../components/ReplyBox'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Dock from '../components/Dock'
import { useState } from 'react'
const TweetChain = ({
  user
}:{
  user: User
}) => {

  //get the focusedTweet tweet
  const focusedTweetID = useParams().tweetID
  // console.log(focusedTweetID)
  // const [focusedTweetID, setFocusedTweetID] = useState(useParams().tweetID)
  // const [focusedTweet, setFocusedTweet] = useState<Tweet>(() => {
  //   return initTweets.filter((d) => d.tweetID === focusedTweetID)[0];
  // })
  const focusedTweet = initTweets.filter((d) => d.tweetID === focusedTweetID)[0];

  //get the replies for the current tweet
  const [children, setChildren] = useState<Tweet[]>(
    // initTweets.filter((d => focusedTweet?.replies.has(d.tweetID))) //should be mapping from focusedTweet.children
    () => {
      const replies = Array.from(focusedTweet.replies)
      return replies.map((d) => {
        return initTweets.filter(d1 => d1.tweetID === d)[0]
      })
    }
  )
  // useEffect(() => {
  //   setFocusedTweetID(useParams().tweetID)
  // }, [])

  // useEffect(() => {
  //   setFocusedTweet(() => {
  //     return initTweets.filter((d) => d.tweetID === focusedTweetID)[0];
  //   })
  //   let replies = Array.from(focusedTweet.replies)
  //   setChildren(replies.map((d) => {
  //     return initTweets.filter(d1 => d1.tweetID === d)[0]
  //   }))
  // }, [focusedTweetID])
  // const focusedTweet:Tweet = initTweets.filter((d) => d.tweetID === focusedTweetID)[0];


  useEffect(() => {
    let replies = Array.from(focusedTweet.replies)
    setChildren(replies.map((d) => {
      return initTweets.filter(d1 => d1.tweetID === d)[0]
    }))
  }, [focusedTweetID])

  //get the ancestors (parent tweets) of the current tweet
  let ancestorNodes = []
  let node = focusedTweet
  while (node && node.parent){
    let grandparent = initTweets.filter((d) => d.tweetID === node.parent)[0]
    ancestorNodes.unshift(grandparent)
    node = grandparent
  }

  //add the reply to the tweet chain whenever a user submits a reply
  const updateReplies = (t: Tweet) => {
    initTweets.unshift(t)
    //find and update parent replies
    const parent = initTweets.filter((d) => d.tweetID === t.parent)[0]
    parent.replies.add(t.tweetID)
    setChildren([t, ...children])
  }

  //scroll the focused tweet into view
  const ref = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current){
      const y = ref.current.getBoundingClientRect().top + -45 + window.scrollY
      window.scrollTo({top: y})
    }
  }, [focusedTweetID])

  const navigate = useNavigate()

  return (
    <>
    <header className="flex p-2 sticky top-0 bg-white z-50 w-full">
      <Link to="/" 
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        // note: navigate(-1) might not work b/c using Link to reset the URLs for tweets 
        // might not properly set the URL in browser history .. . 
      >
        <BiLeftArrowAlt size={30}/>
      </Link>
      <span className="text-xl">
        Tweet
      </span>
    </header>
    {
      ancestorNodes.map((d => <TweetBox tweet={d} isParent={true} key={d.tweetID}/>))
    }
    <div className="h-screen overflow-y-scroll">
      <div ref={ref} className="scroll-mt-10">
        <TweetBox tweet={focusedTweet} isFocused={true}/> 
      </div>
      <ReplyBox user={user} updateReplies={updateReplies} parent={focusedTweet}/>
      {
        children.map(d => <TweetBox tweet={d} key={d.tweetID}/>)
      }
    </div>
    <Dock user={user} allTweets={initTweets}/>
    </>
  )
}

export default TweetChain
