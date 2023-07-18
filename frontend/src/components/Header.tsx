import React, { useEffect } from 'react'
import { BiSolidPear, BiUser, BiLeftArrowAlt } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../utils/APITypes'
import ProfileBlock from './ProfileBlock'
import Profile from '../routes/Profile'
import { useState } from 'react'
import { getUserFromHandle, getUserFromID } from '../utils/APICalls'
import { profile } from 'console'
const Header = ({
  user,
  numTweets,
  profileID,
  handleShowSidebar
}:{
  user: User,
  numTweets?: number,
  profileID?: string,
  handleShowSidebar: () => void
}) => {
  const headerStyles = "sticky flex items-center p-3 bg-white h-auto top-0 dark:bg-black z-50";
  const navigate = useNavigate();
  console.log(`HEADER'S PROFILE ID: ${profileID}`)

  const [focusedUser, setFocusedUser] = useState<User>()
  useEffect(() => {
    if (!profileID) {return;}

    getUserFromHandle(profileID)
      .then(d => setFocusedUser(d))
  }, [profileID])

  return (
    <>
      {
        profileID && focusedUser ?
          <>
            <header className={headerStyles + " " + "justify-around"}>
              <Link to={"/"} className="absolute left-3" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}>
                <BiLeftArrowAlt size={30}/>
              </Link>
              <div>
                <div>
                  {focusedUser?.username} 
                </div>
                <div className="text-twitter-gray">
                  {numTweets} tweets
                </div>
              </div>
            </header>
            <ProfileBlock user={focusedUser}/>
          </>
        :
        <header className={headerStyles}>
          <h1 className="text-2xl"> Home </h1>
          {/* <BiUser className="absolute left-3 dark:text-white" size={30} onClick={handleShowSidebar}/>
          <Link to="/"> 
              <BiSolidPear className="text-twitter-blue" size={30}/>
          </Link> */}
        </header>
      }
    </>
  )
}

export default Header
