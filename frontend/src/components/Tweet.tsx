import React from 'react'
import { BiMessageRounded, BiTransferAlt, BiHeart } from 'react-icons/bi'
import { tweet } from '../utils/APITypes'
import { dateDiffPretty } from '../utils/calculateDates'
import { formatNumber } from '../utils/formatNumber'
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
        <div className="flex space-x-2">
          <div className="font-boldmax-w-3/5 truncate">
              {tweet.username} 
          </div>
          <div className="text-twitter-gray max-w-1/5 truncate">
            @{tweet.uniqueName}
          </div>
          <div className="text-twitter-gray w-1/5 truncate">
            {dateDiffPretty(new Date(), tweet.time)}
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
