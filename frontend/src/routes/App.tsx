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
import PageNotFound from './PageNotFound';
function App() {
  const [user, setUser] = useState<User>()
  const handleUpdateUser = (user1: User) => {
    setUser(user1)
  }
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
      user !== undefined ? 
      <Routes>
        <Route path='/login' element={<Login setUser={handleUpdateUser}/>} />
        {/* optional paramter of profile ID */}
        <Route path='/notfound/' element={<PageNotFound/>} />
        <Route path='/:profileID?' element={<Profile user={user} 
            showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} handleShowSidebar={handleShowSidebar}
              setUser={handleUpdateUser}
            />
          } 
        /> 
        <Route path='/settings' element={<Settings user={user} 
            showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} handleShowSidebar={handleShowSidebar} 
            />} 
          />
        <Route path='/:profileID/status/:tweetID' element={<TweetChain user={user} setUser={handleUpdateUser}/>} />
      </Routes>
    : 
      <Routes>
          <Route path='/login' element={<Login setUser={handleUpdateUser} />} />
      </Routes>
    }
    </>
  );
}

export default App;
