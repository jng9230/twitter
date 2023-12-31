import React, { useState, useRef } from 'react'
import { BiX, BiLeftArrowAlt } from 'react-icons/bi'
import useAutosizeTextArea from '../utils/useAutosizeTextArea'
import { makeTweet } from '../utils/APICalls'
import { Tweet, User } from '../utils/APITypes'
const TweetMaker = ({
    // closeTweetMaker,
    user,
    handleAddTweet
}: {
    // closeTweetMaker: () => void,
    user: User,
    handleAddTweet: (t: Tweet) => void
}) => {
    const [text, setText] = useState("")

    //adjust text area's height wrt text
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, text);

    const makeAndAddTweet = (text: string) => {
        makeTweet(user, text)
            .then(d => {
                setText("")
                handleAddTweet(d);
            })
            .catch(e => console.error(e))
            // .finally(() => closeTweetMaker())
    }

    //give a larger area of focus for the textarea to take
    const focusTextarea = () => {
        textAreaRef.current && textAreaRef.current.focus()
    }
    return (
        <div className="" onClick={focusTextarea}>
            <div className="flex justify-between">
                {/* <BiLeftArrowAlt onClick={() => closeTweetMaker()} size={30} /> */}
                {/* <button
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
                </button> */}
            </div>
            <div className="flex w-full h-auto min-h-[75px]">
                {/* <div>
                    <img src={user.profileImg} alt="profileImg" className="w-8" />
                </div> */}
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
                        "
                    />
                </div>
            </div>
            <div className="px-3 pb-3 flex items-end w-full flex-col">
                <button
                    disabled={text === ""}
                    onClick={(e) => {e.stopPropagation(); makeAndAddTweet(text)}}
                    className="
                        text-white 
                        bg-twitter-blue 
                        px-3
                        py-2 
                        font-bold
                        disabled:opacity-50
                        rounded-full
                    ">
                    Tweet
                </button>
            </div>
        </div>
    )
}

export default TweetMaker
