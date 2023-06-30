import React from 'react'
import { BiSolidPear, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { User } from '../utils/APITypes'
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
  return (
    <header className="sticky w-screen flex items-center justify-around p-3 bg-white h-auto top-0">
      {
        profileID === user.uniqueName ?
        <>
          <Profile/>
        </>
        :
        <>
          <BiUser className="absolute left-3" size={30} onClick={handleShowSidebar}/>
          <Link to="/"> 
              <BiSolidPear className="text-twitter-blue" size={30}/>
          </Link>
        </>
      }
    </header>
  )
}

export default Header
