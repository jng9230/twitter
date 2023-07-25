import React, { useEffect } from 'react'
import { BiMessageRounded, BiTransferAlt, BiHeart } from 'react-icons/bi'
import { Tweet } from '../utils/APITypes'
import { dateDiffPretty } from '../utils/calculateDates'
import { formatNumber } from '../utils/formatNumber'
import { Link, useNavigate, redirect } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { config } from '../utils/config'
import RegularReply from './ReplyRegular'
import ReplyFocused from './ReplyFocused'
import { getTweet } from '../utils/APICalls'
// function randomDate(start: Date, end: Date) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }
// for (let i = 0; i < 1000; i ++){
//   const d1 = new Date("2022-01-30T02:15:00.000Z")
//   const old = new Date("2022-01-30T02:00:00.000Z")
//   const d2 = randomDate(old, d1)
//   console.log(d1.toString());
//   console.log(d2.toString());
//   // console.log(calcDate("1-1-2022", "1-30-2022"))
//   // console.log(calcDateTrimmed("1-29-2022", "1-30-2022"))
//   const w = dateDiffPretty(d1, d2)
//   console.log(w)
//   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
// }

const TweetBox = ({
  tweet,
  isFocused,
  isParent,
  onTimeline,
}: {
  tweet: Tweet,
  isFocused?: boolean,
  isParent?: boolean,
  onTimeline?: boolean,
}) => {
  const navigate = useNavigate();
  const handleTweetClick = (handle: string, id: string) => {
    return navigate(`/${handle}/status/${id}`);
  }
  //parent -> add a vertical line on left to indicate connections
  //focused -> entirely different spacing, full descriptions of icons like likes, replies, etc.

  //scroll focused tweet into view 
  // useEffect(() => {
  //   if (isFocused){
  //     window.scrollTo(0, 0)
  //   }
  // }, [])
  const profileImg = tweet.user.profileImg && tweet.user.profileImg !== "" ? tweet.user.profileImg 
    : config.DEFAULT_PROFILE_IMG
  // console.log("main tweet:")
  // console.log(tweet)
  // console.log(tweet.text)
  // console.log("replying to:")
  // console.log(parentTweet?.text)
  // let parentTweet;

  //get the parent tweet if there is one
  // -- used for showing off/chaining a reply to later
  const [parentTweet, setParentTweet] = useState<Tweet>();
  useEffect(() => {
    if (tweet.parent){
      getTweet(tweet.parent)
        .then(d => setParentTweet(d))
    }
  }, [])
  return (
    <>
    {
      isFocused ? 
        <ReplyFocused tweet={tweet} isParent={isParent} profileImg={profileImg}
          handleTweetClick={handleTweetClick} parentTweet={parentTweet} onTimeline={onTimeline}
        />
      :
        <RegularReply tweet={tweet} isParent={isParent} profileImg={profileImg}
            handleTweetClick={handleTweetClick} parentTweet={parentTweet} onTimeline={onTimeline}
        />
    }
    </>
  )
}

export default TweetBox
