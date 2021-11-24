import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/Navbar';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Profile from './components/views/Profile';
import Signup from './components/views/Signup';
import CreatePost from './components/views/CreatePost';
import UserProfile from './components/views/UserProfile';
import SubscribeUserPost from './components/views/SubscribeUserPost';
import Reset from './components/views/Reset';
import NewPassword from './components/views/NewPassword';

import { UserReducer, initialState } from './reducer/userReducer';

import './App.css'

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('location:', location)
    if (user) {
      dispatch({ type: "USER", payload: user })
      // navigate('/')
    } else {
      if (!location.pathname.startsWith('/reset')) {
        navigate('/login') 
      }
    }
    console.log(user)
  }, [])

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/newPost" element={<CreatePost />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/followersPost" element={<SubscribeUserPost />} />
      <Route exact path="/reset" element={<Reset />} />
      <Route path="/reset/:token" element={<NewPassword />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <NavBar />
        <Routing />
      </Router>
    </UserContext.Provider>
    
  );
}

export default App;
