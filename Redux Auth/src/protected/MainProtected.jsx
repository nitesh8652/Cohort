import React from 'react'
import { Navigate, Outlet } from 'react-router'
import store from '../app/store'
import { useSelector } from 'react-redux'

const MainProtected = () => {
  
  let {user} = useSelector((store)=>store.auth)
  
  if(!user){
    return <Navigate to={'/'} />
  
  }
  
  return <Outlet/>


}

export default MainProtected