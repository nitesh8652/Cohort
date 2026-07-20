import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import Hero from '../components/Hero'

const MyRoutes = () => {
  return (
    <div>
        
        <Routes>
            <Route path='/' element={<Navigate to='/login' /> }/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Hero/>} />
        </Routes>

    </div>
  )
}

export default MyRoutes