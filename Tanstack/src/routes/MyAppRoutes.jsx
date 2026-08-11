import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import AuthLayout from '../layouts/AuthLayout'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/authslice'
import PublicProtected from '../protected/PublicProtected'
import MainProtected from '../protected/MainProtected'

const routes = () => {

  let dispatch = useDispatch()


  const hydrateUser = () => {

    let data = JSON.parse(localStorage.getItem('loginUser'))

    if (!data) {
      return
    }

    dispatch(addUser(data))

  }

  useEffect(() => {

    hydrateUser()

  }, [])

  let router = createBrowserRouter([
    {
      path: '',
      element: <PublicProtected />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            }
          ]
        }
      ]
    },

    {
      path: '/main',
      element: <MainProtected />,
      children:[
      {
        path:'',
        element:<Home />
      }
      ]
    }

  ])

  return <RouterProvider router={router} />
}

export default routes   