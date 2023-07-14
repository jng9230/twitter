import React, { useRef, useCallback, useState } from 'react'
import { User } from '../utils/APITypes'
import { Link, useNavigate } from 'react-router-dom'
import { BiUser, BiCog, BiX, BiLogOut, BiHome, BiSolidPear } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { config } from "../utils/config"
const API_BASE = config.API_BASE;

const Sidebar = ({
  showSidebar,
  user,
  handleHideSidebar
}: {
  showSidebar: boolean,
  user: User,
  handleHideSidebar: () => void
}) => {
  //get window width for responsive purposes
  // const windowWidth = useRef(window.innerWidth)

  //manually navigate so that we do something before changing route
  const navigate = useNavigate();
  const closeSidebarThenLink = useCallback((route: string) => {
    handleHideSidebar();
    navigate(route, { replace: true })
  }, [navigate, handleHideSidebar]);

  const handleLogout = () => {
    window.open(API_BASE + "/auth/logout", "_self");
  }

  const defaultProfileImg = config.DEFAULT_PROFILE_IMG
  
  const sidebarOptionStyles = `
    flex
    items-center
    gap-3
  `
  const sidebarOptions:{ link:string, icon: IconType, text?: string }[] = [
    {
      text: "Home",
      link: "/",
      icon: BiHome,
    },
    {
      text: "Profile",
      link: `/${user.handle}`,
      icon: BiUser 
    },
    {
      text: "Settings",
      link: "/settings",
      icon: BiCog
    }
  ]

  const [tweetModal, setTweetModal] = useState(false);

  return (
    <>
      <div className="sticky w-auto h-screen bg-white top-0 left-0 p-3 space-y-6">
        <div className={sidebarOptionStyles} key="logo">
          <button type="button" onClick={() => closeSidebarThenLink(`/`)}>
            <BiSolidPear size={30} className=""/>
          </button>
        </div>

        {
            sidebarOptions.map(d => {
              return (
                <Link to={d.link} className={sidebarOptionStyles} key={d.text}>
                    {<d.icon size={30} />}
                    {d.text}
                </Link>
              )
            })
        }

        <div className={sidebarOptionStyles} key={"logout"}>
          <button type="button" onClick={handleLogout}>
            <BiLogOut size={30}/>
          </button>
            Logout
        </div>

        <button type="button" 
          className="
            rounded-full
            w-3/4
            py-2
            text-white
            bg-twitter-blue
          "
          onClick={() => {setTweetModal(true)}}
        > 
          Tweet 
        </button>
        
        {/* <BiX onClick={handleHideSidebar} className="lg:hidden" /> */}
        <div className="flex items-center gap-3">
          <img src={user.profileImg ? user.profileImg : defaultProfileImg} alt="" className="rounded-full h-10 w-auto" />
          <div>
            <div className="mr-1">
              {user.username}
            </div>
            <div className="text-twitter-gray">
              @{user.handle}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
