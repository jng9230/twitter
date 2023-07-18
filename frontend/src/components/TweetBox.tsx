import React, { useEffect } from 'react'
import { BiMessageRounded, BiTransferAlt, BiHeart } from 'react-icons/bi'
import { Tweet } from '../utils/APITypes'
import { dateDiffPretty } from '../utils/calculateDates'
import { formatNumber } from '../utils/formatNumber'
import { Link, useNavigate, redirect } from 'react-router-dom'
import { useCallback } from 'react'
import { config } from '../utils/config'
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
  parentTweet
}: {
  tweet: Tweet,
  isFocused?: boolean,
  isParent?: boolean,
  onTimeline?: boolean,
  parentTweet?: Tweet
}) => {
  const navigate = useNavigate();
  // const handleTweetClick = useCallback((handle:string, id:string) => {
  //   navigate(`/${handle}/status/${id}`, { replace: true });
  // }, [navigate])
  const handleTweetClick = (handle: string, id: string) => {
    return navigate(`/${handle}/status/${id}`);
  }

  //parent -> add a vertical line on left to indicate connections
  //focused -> entirely different spacing, full descriptions of icons like likes, replies, etc.
  // useEffect(() => {
  //   if (isFocused){
  //     window.scrollTo(0, 0)
  //   }
  // }, [])
  const profileImg = tweet.user.profileImg && tweet.user.profileImg !== "" ? tweet.user.profileImg 
    : config.DEFAULT_PROFILE_IMG
  return (
    <>
    {
      isFocused ? 
        <div className="p-2">
          <div className="flex">
            <Link to={`/${tweet.user.handle}`} onClick={(e) => e.stopPropagation()}>
              <img src={profileImg} alt="" className="w-11 h-11 rounded-full relative top-2" />
            </Link>
            <div className="">
              <Link to={`/${tweet.user.handle}`} onClick={(e) => e.stopPropagation()}>
                <div className="font-bold truncate">
                  {tweet.user.username}
                </div>
                <div className="text-twitter-gray truncate">
                  @{tweet.user.handle}
                </div>
              </Link>
            </div>
          </div>
          <div className="my-3">
            {tweet.text}
          </div>
          <div className="w-full">
            <div className="text-twitter-gray">
              {new Date(tweet.time).toLocaleString()}
            </div>
            <div className="w-full py-2 flex justify-between">
              <div className="flex items-center">
                {formatNumber(tweet.replies.length)} 
                  <span className="text-twitter-gray ml-1"> Replies</span>
              </div>
              <div className="flex items-center">
                {formatNumber(tweet.retweets)}
                <span className="text-twitter-gray ml-1"> Quotes</span>
              </div>
              <div className="flex items-center">
                <BiHeart className="inline mr-1" />
                {formatNumber(tweet.likes)}
                <span className="text-twitter-gray ml-1"> Likes</span>
              </div>
            </div>
          </div>
        </div>
      :
        <div className="flex justify-between p-2 cursor-pointer relative" onClick={() => handleTweetClick(tweet.user.handle, tweet.tweetID)}>
        <div className="mr-3 relative">
          <Link to={`/${tweet.user.handle}`} className="z-50" onClick={(e) => e.stopPropagation()}>
            <img src={profileImg} alt="" className="w-11 h-11 rounded-full relative top-2"/>
          </Link>
          {
            isParent && 
            <div className="absolute h-full w-[2px] inset-x-1/2 bg-gray-200 -z-10"></div>
          }
        </div>
        <div className="w-5/6">
          <Link to={`/${tweet.user.handle}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex space-x-2">
              <div className="font-bold max-w-3/5 truncate">
                {tweet.user.username} 
              </div>
              <div className="text-twitter-gray max-w-1/5 truncate">
                @{tweet.user.handle}
              </div>
              <div className="text-twitter-gray w-1/5 truncate">
                {dateDiffPretty(new Date(), new Date(tweet.time))}
              </div>
            </div>
          </Link>
          <div className="space-y-2">
            <div>
              {tweet.text}
            </div>
            {
              onTimeline && parentTweet && 
                <div className="rounded-lg border-gray-400 flex p-2 cursor-pointer border-[1px]">
                <div className="mr-3 relative">
                  <img src={profileImg} alt="" className="w-6 h-6 rounded-full relative top-2" />
                </div>
                <div className="w-5/6"> 
                    <Link to={`/${parentTweet.user.handle}`} onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-2">
                        <div className="font-bold max-w-3/5 truncate">
                          {tweet.user.username}
                        </div>
                        <div className="text-twitter-gray max-w-1/5 truncate">
                          @{tweet.user.handle}
                        </div>
                        <div className="text-twitter-gray w-1/5 truncate">
                          {dateDiffPretty(new Date(), new Date(tweet.time))}
                        </div>
                      </div>
                    </Link>
                  <div>
                    {parentTweet.text}
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="w-full py-2 flex justify-between text-twitter-gray">
            <div className="flex items-center">
              <BiMessageRounded className="inline mr-1" />
              {formatNumber(tweet.replies.length)}
            </div>
            <div className="flex items-center">
              <BiTransferAlt className="inline mr-1" />
              {formatNumber(tweet.retweets)}
            </div>
            <div className="flex items-center">
              <BiHeart className="inline mr-1"/>
              {formatNumber(tweet.likes)}
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default TweetBox
