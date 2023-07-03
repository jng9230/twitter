import React, { useState, useRef} from 'react'
import { BiX, BiLeftArrowAlt } from 'react-icons/bi'
import useAutosizeTextArea from '../utils/useAutosizeTextArea'
import { makeTweet } from '../utils/APICalls'
import { Tweet, User } from '../utils/APITypes'
const TweetMaker = ({
  closeTweetMaker,
  user,
  handleAddTweet
}:{
  closeTweetMaker: () => void,
  user: User,
  handleAddTweet: (t: Tweet) => void
}) => {
  const [text, setText] = useState("")

  //adjust text area's height wrt text
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, text);

  const makeAndAddTweet = (text:string) => {
      //TODO: make API call
      const tweet:Tweet = {
        user: user,
        text: text,
        likes: 0,
        retweets: 0,
        replies: new Set<string>(),
        time: new Date(),
        tweetID: Math.floor(Math.random() * 100000000000).toString()
      }
      handleAddTweet(tweet);
      closeTweetMaker();
  }
  return (
    <div className="w-screen h-screen z-50 fixed top-0 left-0 bg-white">
      <div className="flex justify-between">
        <BiLeftArrowAlt onClick={() => closeTweetMaker()} size={30}/>
        <button 
          disabled={text === ""}
          onClick={() => makeAndAddTweet(text)}
          className="
            text-white 
            bg-twitter-blue 
            p-3 
            font-bold
            disabled:opacity-50
          "> 
          Tweet 
        </button>
      </div>
      <div className="flex w-full h-auto">
        <div>
          <img src={user.profileImg} alt="profileImg" className="w-8"/>
        </div>
        <div className="w-full">
          <textarea name="tweetTextArea" id="tweetTextArea" onChange={e => setText(e.target.value)} 
            value={text} placeholder={"What is happening?!"} autoFocus
            ref={textAreaRef}
            className="
              resize-none
              w-full
              p-2
              border-none
              shadow-none
              outline-none
              bg-transparent
              h-full
            ">
          </textarea>
        </div>
      </div>
    </div>
  )
}

export default TweetMaker
