import React, { useRef } from 'react'
import { User } from '../utils/APITypes'
import { Link } from 'react-router-dom'
import { BiUser, BiCog, BiX } from 'react-icons/bi'
const Sidebar = ({
  showSideBar,
  user,
  handleHideSidebar
}:{
  showSideBar: boolean,
  user: User,
  handleHideSidebar: () => void
}) => {
  const windowWidth = useRef(window.innerWidth)
  return (
    <>
      {
        (windowWidth.current >= 1024 || showSideBar ) && 
          <div className="fixed w-screen h-screen bg-gray top-0 left-0">
            <div className="fixed w-auto h-screen bg-white top-0 left-0">
              <div>
                <img src={user.profileImg} alt=""/>
                {user.displayName}
                @{user.uniqueName}
              </div>
              <div>
                <BiUser size={30}/> 
                Profile
                <Link to={`/${user.uniqueName}`} />
              </div>
              <div>
                <BiCog size={30}/>
                Settings
                <Link to="/settings" />
              </div>

              <BiX onClick={handleHideSidebar}/>
            </div>
          </div>

      }
    </>
  )
}

export default Sidebar
