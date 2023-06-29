import React from 'react'
import { BiSolidPear, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="sticky w-screen flex items-center justify-around p-3 bg-white h-auto top-0">
        <BiUser className="absolute left-3" size={30}/>
        <Link to="/"> 
            <BiSolidPear className="text-twitter-blue" size={30}/>
        </Link>
    </header>
  )
}

export default Header
