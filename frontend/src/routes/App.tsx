import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Settings from './Settings'
import Login from './Login';
import Profile from './Profile';
import TweetChain from './TweetChain';
import { User } from '../utils/APITypes';
import { useState, useEffect } from 'react';
import { user as user1} from "../utils/localTestVars";
import { getUserFromID, getAuthedUser } from '../utils/APICalls';
function App() {
  const [user, setUser] = useState<User>(user1)
  //the useEffect below should never allow user1 to be set (reroutes to login)
  const navigate = useNavigate();
  useEffect(() => {
    getAuthedUser()
      .then(d => {
        setUser(d)
      })
      .catch((e : Error) => {
        console.error(e)
        if (e.name === "AuthError"){
          navigate("/login", { replace : true })
        }
      })
  }, [])

  const [showSidebar, setShowSidebar] = useState(false);
  const handleShowSidebar = () => {
    setShowSidebar(true);
  }
  const handleHideSidebar = () => {
    setShowSidebar(false);
  }

  return (
    <>
    {
      user ? 
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        {/* optional paramter of profile ID */}
        <Route path='/:profileID?' element={<Profile user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} handleShowSidebar={handleShowSidebar}/>} /> 
        <Route path='/settings' element={<Settings user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} handleShowSidebar={handleShowSidebar} />} />
        <Route path='/:profileID/status/:tweetID' element={<TweetChain user={user}/>} />
      </Routes>
    : <div>
      loading user
    </div>
    }
    </>
  );
}

export default App;
