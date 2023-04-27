import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Vietos from './pages/Vietos'
import Renginiai from './pages/Renginiai'
import UserEvents from './pages/UserEvents'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import LoginRegister from './pages/Login&Register'
import React, { useState } from "react";

import './css/App.css'
import './css/styles.css'

function App() {

  const [activeUser, setActiveUser] = useState()

  // if(!activeUser){
  //   console.log("user not logged in")
  // } else {
  //   console.log("user logged in")
  // }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login&register' element={<LoginRegister setActiveUser={setActiveUser}/>} />
          <Route path="/renginiai" element={<Renginiai />} />
          <Route path="/vietos" element={<Vietos />} />
          <Route path="/userevents" element={<UserEvents />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
