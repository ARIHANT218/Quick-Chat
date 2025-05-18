
import NavBar from './component/NavBar'

import Login from './component/pages/Login'
import Home from './component/pages/Home'
import Signup from './component/pages/Signup'
import Profile from './component/pages/Profile'
import Settings from './component/pages/Settings'
import Logout from './component/pages/Logout'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import './index.css'


function App() {
  const {authUser, checkAuth} = useAuthStore();

  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log(authUser);

  return (
    <div>

          <NavBar/>
          <Routes>
            <Route path="/" element={authUser? <Home />:<Navigate to="/login" />} />
            <Route path= "/signup" element = {!authUser? <Signup />:<Navigate to="/" />} />
            <Route path= "/login" element = {!authUser?<Login /> :<Navigate to="/" />} />
            <Route path= "/profile" element = {<Profile />} />
            <Route path= "/settings" element = {<Settings />} />
            <Route path= "/logout" element = {<Logout />} />
            
              </Routes>
            <Toaster/>
    </div>
  )
}

export default App


