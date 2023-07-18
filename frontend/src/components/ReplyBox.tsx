import React from 'react'
import { Tweet, User } from '../utils/APITypes'
import { useState, useRef } from 'react'
import useAutosizeTextArea from '../utils/useAutosizeTextArea'
const ReplyBox = ({
  user,
  updateReplies,
  parent
}:{
  user: User,
  updateReplies: (t:Tweet) => void,
  parent: Tweet
}) => {
  const [text, setText] = useState("")

  //adjust text area's height wrt text
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, text);

  const handleAddReply = () => {
    //TODO: make API call
    const tweet: Tweet = {
      user: user,
      text: text,
      likes: 0,
      retweets: 0,
      replies: [],
      time: new Date(),
      _id: Math.floor(Math.random() * 100000000000).toString(),
      parent: parent._id
    }
    setText("")
    updateReplies(tweet);
  }
  return (
    <div className="flex justify-between p-2">
      <img src={user.profileImg} alt="" className="w-11 h-11 rounded-full"/>
      <div className="w-full">
        <textarea name="tweetTextArea" id="tweetTextArea" onChange={e => setText(e.target.value)}
          value={text} placeholder={"Tweet your reply!"}
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
      <div>
        <button type="button" className="text-white bg-twitter-blue p-3 font-bold" onClick={handleAddReply}>
          Reply
        </button>
      </div>
    </div>
  )
}

export default ReplyBox
