import React, { useEffect, useRef } from 'react'
import TweetBox from '../components/TweetBox'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { initTweets } from '../utils/localTestVars'
import { Tweet, User } from '../utils/APITypes'
import ReplyBox from '../components/ReplyBox'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Dock from '../components/Dock'
import { useState } from 'react'
import { getTweet, replyToTweet } from '../utils/APICalls'
import { reverseChronoSort } from '../utils/reverseChronoSort'
const TweetChain = ({
  user
}:{
  user: User
}) => {

  //get the focusedTweet tweet
  const focusedTweetID = useParams().tweetID
  // if (!focusedTweetID) {
  //   return <></>
  // }
  // console.log(focusedTweetID)
  // const [focusedTweetID, setFocusedTweetID] = useState(useParams().tweetID)
  // const [focusedTweet, setFocusedTweet] = useState<Tweet>(() => {
  //   return initTweets.filter((d) => d.tweetID === focusedTweetID)[0];
  // })
  const [focusedTweet, setFocusedTweet] = useState<Tweet>()
  const [children, setChildren] = useState<Tweet[]>()
  const [parents, setParents] = useState<Tweet[]>()

  useEffect(() => {
    const getData = async () => {
      if (!focusedTweetID){
        console.error("NO FOCUSED TWEET ID")
        return;
      }

      try {
        //get focused tweet
        const tweet = await getTweet(focusedTweetID)
        setFocusedTweet(tweet)

        //get replies
        const replyIDs = tweet.replies;
        const replies = await Promise.all(
          replyIDs.map(async (d) => {
            return await getTweet(d)
          })
        )
        const sortedReplies = reverseChronoSort(replies)
        setChildren(sortedReplies)

        //get all parent tweets
        let parentTweets = []
        let node = focusedTweet
        while (node && node.parent){
          let currParent = await getTweet(node.parent)
          parentTweets.unshift(currParent)
          node = currParent
        }
        setParents(parentTweets)

      } catch (e) {
        console.error(e)
      }
    }
    getData();
  }, [focusedTweetID])


  //get the ancestors (parent tweets) of the current tweet
  // let ancestorNodes = []
  // let node = focusedTweet
  // while (node && node.parent){
  //   let grandparent = initTweets.filter((d) => d.tweetID === node.parent)[0]
  //   ancestorNodes.unshift(grandparent)
  //   node = grandparent
  // }

  // add the reply to the tweet chain whenever a user submits a reply
  const updateReplies = (t: string) => {
    // initTweets.unshift(t)
    //find and update parent replies
    // const parent = initTweets.filter((d) => d.tweetID === t.parent)[0]
    // parent.replies.push(t.tweetID)
    if (!focusedTweet){ return }

    replyToTweet(t, focusedTweet, user)
      .then(d => {
        if (children !== undefined){
          setChildren([d, ...children])
        }
      })
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
      <div className="w-screen h-screen">
        <div className="max-w-screen-xl grid grid-cols-4 gap-3 mx-auto">
          <div>

          </div>
          <div className="col-span-2">

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
              parents?.map((d => <TweetBox tweet={d} isParent={true} key={d._id}/>))
            }
            <div className="h-screen overflow-y-scroll">
              <div ref={ref} className="scroll-mt-10">
                {
                  focusedTweet ?
                  <TweetBox tweet={focusedTweet} isFocused={true}/> 
                  : <></>
                }
              </div>
              {
                focusedTweet && 
                <ReplyBox user={user} updateReplies={updateReplies} parent={focusedTweet}/>
              }
              {
                children?.map(d => <TweetBox tweet={d} key={d._id}/>)
              }
            </div>
          </div>
          <div>

          </div>
    </div>
    </div>
    </>
  )
}

export default TweetChain


// import React from 'react'

// const TweetChain = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default TweetChain

