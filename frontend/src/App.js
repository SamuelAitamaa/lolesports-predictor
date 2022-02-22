import React, { useState, useEffect } from 'react'
import About from './components/About'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/about' element={<About/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
        </Router>
      </>
    )
}

export default App;