import React from 'react'
import { BiSolidPear, BiUser, BiLeftArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { User, UserNetwork } from '../utils/APITypes'
import ProfileBlock from './ProfileBlock'
import Profile from '../routes/Profile'
const Header = ({
  user,
  numTweets,
  profileID,
  handleShowSidebar
}:{
  user: User,
  numTweets: number,
  profileID?: string,
  handleShowSidebar: () => void
}) => {
  const headerStyles = "sticky w-screen flex items-center justify-around p-3 bg-white h-auto top-0";
  const userNetwork:UserNetwork = {
    followers: [],
    following: []
  }
  return (
    <>
      {
        profileID === user.uniqueName ?
        <>
          <header className={headerStyles}>
            <Link to="/" className="absolute left-3">
              <BiLeftArrowAlt size={30}/>
            </Link>
            <div>
              <div>
                {user.displayName} 
              </div>
              <div className="text-twitter-gray">
                {numTweets} tweets
              </div>
            </div>
          </header>
          <ProfileBlock user={user} userNetwork={userNetwork}/>
        </>
        :
        <header className={headerStyles}>
          <BiUser className="absolute left-3" size={30} onClick={handleShowSidebar}/>
          <Link to="/"> 
              <BiSolidPear className="text-twitter-blue" size={30}/>
          </Link>
        </header>
      }
    </>
  )
}

export default Header
