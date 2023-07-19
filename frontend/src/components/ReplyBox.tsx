import React from 'react'
import { Tweet, User } from '../utils/APITypes'
import { useState, useRef } from 'react'
import useAutosizeTextArea from '../utils/useAutosizeTextArea'
import { config } from '../utils/config'

const ReplyBox = ({
  user,
  updateReplies,
  parent
}:{
  user: User,
  updateReplies: (t:string) => void,
  parent: Tweet
}) => {
  const [text, setText] = useState("")

  //adjust text area's height wrt text
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, text);

  const handleAddReply = () => {
    setText("")
    updateReplies(text);
  }
  const profileImg = user.profileImg && user.profileImg !== "" ? user.profileImg
    : config.DEFAULT_PROFILE_IMG
  return (
    <div className="flex justify-between p-2">
      <img src={profileImg} alt="" className="w-11 h-11 rounded-full"/>
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
      <button type="button"   
          onClick={handleAddReply}
          className="
            text-white 
            bg-twitter-blue 
            px-5
            py-2 
            font-bold
            rounded-full
          ">
          Reply
        </button>
      </div>
    </div>
  )
}

export default ReplyBox
