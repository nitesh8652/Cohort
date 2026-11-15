import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from '../../features/auth/ui/pages/Login'
import Register from '../../features/auth/ui/pages/Register'
import AuthLayout from '../../app/layouts/AuthLayout'
import Home from '../../features/dashboard/ui/pages/Home'
import DashboardLayout from '../layouts/dashboardLayout'

const appRoutes = () => {

    let router = createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />,
            children: [
                {
                    path: "",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                }
            ]
        },

        {
            path:'/home',
            element:<DashboardLayout />,
            children:[
                {
                    path:"",
                    element:<Home />
                }
            ]
        }
    ])

    return <RouterProvider router={router}   />
}

export default appRoutes
