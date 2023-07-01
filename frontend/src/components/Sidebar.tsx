import React, { useRef, useCallback } from 'react'
import { User } from '../utils/APITypes'
import { Link, useNavigate } from 'react-router-dom'
import { BiUser, BiCog, BiX } from 'react-icons/bi'
const Sidebar = ({
  showSidebar,
  user,
  handleHideSidebar
}:{
  showSidebar: boolean,
  user: User,
  handleHideSidebar: () => void
}) => {
  //get window width for responsive purposes
  const windowWidth = useRef(window.innerWidth)

  //manually navigate so that we do something before changing route
  const navigate = useNavigate();
  const closeSidebarThenLink = useCallback((route:string) => {
    handleHideSidebar();
    navigate(route, { replace: true })
  }, [navigate]);

  return (
    <>
      {
        (windowWidth.current >= 1024 || showSidebar ) && 
        <div className="fixed w-screen h-screen bg-gray top-0 left-0 bg-black/[.60] z-50">
          <div className="fixed w-auto h-screen bg-white top-0 left-0 p-2">
            <h1>Account info</h1>
            <div>
              <img src={user.profileImg} alt="" className="rounded-full h-auto w-20"/>
                <span className="mr-1">
                  {user.username}
                </span>
                <span className="text-twitter-gray">
                  @{user.handle}
                </span>
            </div>
            <button type="button" onClick={() => closeSidebarThenLink(`/${user.handle}`)}> 
              <BiUser size={30}/> 
              Profile
            </button>
            <button type="button" onClick={() => closeSidebarThenLink(`/settings`)}> 
              <BiCog size={30}/>
              Settings
            </button>
            <BiX onClick={handleHideSidebar} className="lg:hidden"/>
          </div>
          {/* extra div to close sidebar if user presses outside of it */}
          <div className="w-auto h-full" onClick={handleHideSidebar}>
          </div>
        </div>

      }
    </>
  )
}

export default Sidebar
