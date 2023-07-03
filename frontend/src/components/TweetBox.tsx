import React from 'react'
import { BiMessageRounded, BiTransferAlt, BiHeart } from 'react-icons/bi'
import { Tweet } from '../utils/APITypes'
import { dateDiffPretty } from '../utils/calculateDates'
import { formatNumber } from '../utils/formatNumber'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
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
  isFocused
}: {
  tweet: Tweet,
  isFocused?: boolean
}) => {
  const navigate = useNavigate();
  const handleTweetClick = useCallback(() => {
    navigate(`/${tweet.user.handle}/status/${tweet.tweetID}`, { replace: true });
  }, [navigate, tweet.user.handle, tweet.tweetID])
  return (
    <>
    {
      isFocused ? 
        <div className="p-2">
          <div className="flex">
            <img src={tweet.user.profileImg} alt="" className="h-11 w-auto rounded-full mr-2" />
            <div className="">
              <div className="font-bold truncate">
                {tweet.user.username}
              </div>
              <div className="text-twitter-gray truncate">
                @{tweet.user.handle}
              </div>
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
                {/* <BiMessageRounded className="inline mr-1" /> */}
                {formatNumber(tweet.replies.size)} 
                  <span className="text-twitter-gray ml-1"> Replies</span>
              </div>
              <div className="flex items-center">
                {/* <BiTransferAlt className="inline mr-1" /> */}
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
      <div className="flex justify-between p-2 cursor-pointer relative" onClick={handleTweetClick}>
        <div className="mr-3">
          <img src={tweet.user.profileImg} alt="" className="w-11 rounded-full relative top-2"/>
        </div>
        <div className="w-full">
          <div className="flex space-x-2">
            <div className="font-bold max-w-3/5 truncate">
              {tweet.user.username} 
            </div>
            <div className="text-twitter-gray max-w-1/5 truncate">
              @{tweet.user.handle}
            </div>
            <div className="text-twitter-gray w-1/5 truncate">
              {dateDiffPretty(new Date(), tweet.time)}
            </div>
          </div>
          <div>
            {tweet.text}
          </div>
          <div className="w-full py-2 flex justify-between text-twitter-gray">
            <div className="flex items-center">
              <BiMessageRounded className="inline mr-1" />
              {formatNumber(tweet.replies.size)}
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
