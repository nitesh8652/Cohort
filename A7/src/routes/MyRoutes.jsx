import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Shop from '../components/Shop'
import About from '../components/About'
import Cart from '../components/Cart'

const MyRoutes = () => {
  return (
    <div>
        
        <Routes>
            <Route path='/' element={<Navigate to='/login' /> }/>
            
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Hero/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/cart' element={<Cart/>} />
        </Routes>

    </div>
  )
}

export default MyRoutes