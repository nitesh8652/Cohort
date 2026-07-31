import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import AuthLayout from '../layouts/AuthLayout'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'

const routes = () => {

  let router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      children:[
        {
          path:'',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        }
      ]
    },

    {
      path:'/main',
      element:<MainLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
          
        }
      ]
    }
  
  ])

  return <RouterProvider router = {router} />
}

export default routes   