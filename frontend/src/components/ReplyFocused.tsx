import { Link } from 'react-router-dom'
import { dateDiffPretty } from '../utils/calculateDates'
import { Tweet } from '../utils/APITypes'
import { BiHeart, BiTransferAlt, BiMessageRounded } from 'react-icons/bi'
import { formatNumber } from '../utils/formatNumber'
const ReplyFocused = ({
    tweet,
    isParent,
    profileImg,
    handleTweetClick,
    parentTweet
}: {
    tweet: Tweet
    isParent?: boolean,
    profileImg: string,
    handleTweetClick: (handle: string, tweetID: string) => void,
    parentTweet?: Tweet
}) => {
    const onTimeline = true;
  return (
    <>
    <div className="p-2">
        <div className="flex gap-3">
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
            <div className="w-full py-2 flex gap-20">
                <div className="flex items-center">
                    {formatNumber(tweet.replies.length)}
                    <span className="text-twitter-gray ml-1"> Replies</span>
                </div>
                {/* <div className="flex items-center">
                    {formatNumber(tweet.retweets)}
                    <span className="text-twitter-gray ml-1"> Quotes</span>
                </div> */}
                <div className="flex items-center">
                    <BiHeart className="inline mr-1" />
                    {formatNumber(tweet.likes)}
                    <span className="text-twitter-gray ml-1"> Likes</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ReplyFocused
