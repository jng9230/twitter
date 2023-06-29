import React from 'react'
import { BiHome,BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'
const Dock = () => {
  return (
    <div className="w-screen flex items-center justify-around fixed bottom-0 p-3 bg-white">
        <Link to="/">
          <BiHome size={30}/>
        </Link>
        <BiSearch size={30}/>
    </div>
  )
}

export default Dock
