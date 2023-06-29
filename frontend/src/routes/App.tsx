import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './Settings'
import Login from './Login';
import Profile from './Profile';
import TweetChain from './TweetChain';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Profile />} />
        <Route path='/:profileID' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/:profileID/status/:tweetID' element={<TweetChain />} />
      </Routes>
    </Router>
  );
}

export default App;
