import React from 'react'
import { Link } from 'react-router-dom'
import { dateDiffPretty } from '../utils/calculateDates'
import { Tweet } from '../utils/APITypes'
import { BiHeart, BiTransferAlt, BiMessageRounded } from 'react-icons/bi'
import { formatNumber } from '../utils/formatNumber'
const ReplyRegular = ({
    tweet,
    isParent,
    profileImg,
    handleTweetClick,
    parentTweet,
    onTimeline
}: {
    tweet: Tweet
    isParent?: boolean,
    profileImg: string,
    handleTweetClick: (handle: string, tweetID: string) => void,
    parentTweet?: Tweet,
    onTimeline?: boolean
}) => {
    return (
    <>
    <div className="flex gap-3 p-2 cursor-pointer relative" onClick={() => handleTweetClick(tweet.user.handle, tweet._id)}>
        <div className="mr-3 relative">
            <Link to={`/${tweet.user.handle}`} className="z-50" onClick={(e) => e.stopPropagation()}>
                <img src={profileImg} alt="" className="w-11 h-11 rounded-full relative top-2" />
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
            <div className="w-full py-2 flex gap-20 text-twitter-gray">
                <div className="flex items-center">
                    <BiMessageRounded className="inline mr-1" />
                    {formatNumber(tweet.replies.length)}
                </div>
                {/* <div className="flex items-center">
                    <BiTransferAlt className="inline mr-1" />
                    {formatNumber(tweet.retweets)}
                </div> */}
                <div className="flex items-center">
                    <BiHeart className="inline mr-1" />
                    {formatNumber(tweet.likes)}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ReplyRegular
