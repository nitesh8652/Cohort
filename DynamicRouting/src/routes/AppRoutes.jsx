import React from 'react'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Products from '../components/Products'
import {Routes, Route} from 'react-router'
import Home from '../components/Home'
import Details from '../components/Details'

const AppRoutes = () => {
  return (
    <div>

   <Navbar />
    <Routes>
      <Route path='/about' element={<About />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/' element={<Home />}/>
      <Route path='/details/:id' element={<Details />}/>
    </Routes>

    </div>
  )
}

export default AppRoutes