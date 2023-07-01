import React, { ChangeEventHandler, useState } from 'react'
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
  const [isDefaultLighting, setLightingMode] = useState(true)
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightingMode(e.target.value === "default")
  }
  return (
    <>
      <Header user={user} handleShowSidebar={handleShowSidebar}/>
      <Sidebar user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} />
      <div className="space-y-3 p-3">
        <h1> Background </h1>
        <div className="p-3 border-black border-2 rounded-md">
          <input type="radio" id="lightMode" name="lightMode" checked={isDefaultLighting} onChange={e => onOptionChange(e)} value="default"/>
          <label htmlFor="lightMode"> Default </label>
        </div>
        <div className="p-3 border-black border-2 rounded-md bg-black text-white">
          <input type="radio" id="darkMode" name="darkMode" checked={!isDefaultLighting} onChange={e => onOptionChange(e)} value="dark"/>
          <label htmlFor="darkMode"> Lights Out </label>
        </div>
      </div>
    </>
  )
}

export default Settings
