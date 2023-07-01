import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './Settings'
import Login from './Login';
import Profile from './Profile';
import TweetChain from './TweetChain';
import { User } from '../utils/APITypes';
import { useState } from 'react';

function App() {
  const user1: User = {
    userID: "",
    username: "bing bong bing",
    handle: "realBingBong",
    profileImg: "https://pbs.twimg.com/profile_images/1644390638912434176/AuiHnex3_400x400.jpg"
  }
  const [user, setUser] = useState<User>(user1)

  const [showSidebar, setShowSidebar] = useState(false);
  const handleShowSidebar = () => {
    setShowSidebar(true);
  }
  const handleHideSidebar = () => {
    setShowSidebar(false);
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* optional paramter of profile ID */}
        <Route path='/:profileID?' element={<Profile user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} handleShowSidebar={handleShowSidebar}/>} 
        /> 
        <Route path='/settings' element={<Settings user={user} showSidebar={showSidebar} handleHideSidebar={handleHideSidebar} handleShowSidebar={handleShowSidebar} />} />
        <Route path='/:profileID/status/:tweetID' element={<TweetChain />} />
      </Routes>
    </Router>
  );
}

export default App;
