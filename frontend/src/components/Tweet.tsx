import React from 'react'
import { BiMessageRounded, BiTransferAlt, BiHeart } from 'react-icons/bi'
import { tweet } from '../utils/APITypes'
// var numeral = require('numeral')
// // console.log(numeral(1231323123).format("0.0a"))
// const formatNumber = (x:number) => {
//   return numeral(x).format("0a")
// }
import { formatNumber } from '../utils/formatNumber'
const Tweet = ({
  tweet
}: {
  tweet: tweet
}) => {
  console.log(tweet);
  return (
    <div className="flex justify-between p-2">
      <div>
        <img src={tweet.profileImg} alt="" className="w-8"/>
      </div>
      <div className="w-4/5">
        <div className="flex">
          <div className="font-bold w-3/5 truncate">
              {tweet.username} 
          </div>
          <div className="text-twitter-gray w-1/5 truncate">
            @{tweet.uniqueName}
          </div>
          <div className="w-1/5 truncate">
            8m ago
            {/* {tweet.time.toString()} */}
          </div>
        </div>
        <div>
          {tweet.text}
        </div>
        <div className="w-full py-2 flex justify-between">
          <div className="flex items-center">
            <BiMessageRounded className="inline mr-1" />
            {formatNumber(tweet.replies)}
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
  )
}

export default Tweet
