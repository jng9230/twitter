import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { User } from '../utils/APITypes'
import Sidebar from '../components/Sidebar'
const Settings = ({
  user,
  showSidebar,
  handleHideSidebar,
  handleShowSidebar
}: {
  user: User,
  showSidebar: boolean,
  handleHideSidebar: () => void,
  handleShowSidebar: () => void
}) => {
  //light/dark mode: only allow one radio button to be set at a time
  const [isDefaultLighting, setLightingMode] = useState(() =>{
    try {
      const item = window.localStorage.getItem("isDefaultLighting")
      return item ? JSON.parse(item) : true
    } catch(e) {
      console.error(e)
      return true
    }
  })
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightingMode(e.target.value === "default");
  }

  //set/get the user's preferred mode from local storage
  
  //add the "dark" class to body to let tailwind know we're in darkmode
  useEffect(() => {
    //set the mode in local storage
    try {
      window.localStorage.setItem("isDefaultLighting", JSON.stringify(isDefaultLighting))
    } catch(e){
      console.error(e)
    }
    const bodyClassList = window.document.body.classList;
    isDefaultLighting ? bodyClassList.remove("dark") : bodyClassList.add("dark");
  }, [isDefaultLighting])

  return (
    // <div className="dark:bg-black">
    <>
      <Header user={user} handleShowSidebar={handleShowSidebar}/>
      <Sidebar user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} />
      <div className="bg-white dark:bg-black">
        <div className="space-y-3 p-3 h-screen">
          <h1 className="dark:text-white"> Background </h1>
          <div className="p-3 border-black border-2 rounded-md bg-white dark:border-white">
            <input type="radio" id="lightMode" name="lightMode" checked={isDefaultLighting} onChange={e => onOptionChange(e)} value="default"/>
            <label htmlFor="lightMode"> Default </label>
          </div>
          <div className="p-3 border-black border-2 rounded-md bg-black text-white dark:border-white">
            <input type="radio" id="darkMode" name="darkMode" checked={!isDefaultLighting} onChange={e => onOptionChange(e)} value="dark"/>
            <label htmlFor="darkMode"> Lights Out </label>
          </div>
        </div>
      </div>
    {/* </div> */}
    </>
  )
}

export default Settings
