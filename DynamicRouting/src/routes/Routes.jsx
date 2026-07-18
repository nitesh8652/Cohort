import React from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Products from './components/Products'
import {Routes, Route} from 'react-router'
import Home from './components/Home'

const Routes = () => {
  return (
    <div>

   <Navbar />
    <Routes>
      <Route path='/about' element={<About />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/' element={<Home />}/>
    </Routes>

    </div>
  )
}

export default Routes