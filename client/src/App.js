import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/Navbar';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Profile from './components/views/Profile';
import Signup from './components/views/Signup';
import CreatePost from './components/views/CreatePost';

import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newPost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
