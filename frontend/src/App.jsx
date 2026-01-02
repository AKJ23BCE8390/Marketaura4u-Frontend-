import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/homepage' element={<HomePage/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
