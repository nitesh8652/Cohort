import { Navigate } from 'react-router'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import store from '../app/store'

const PublicProtected = () => {

    let { user } = useSelector((store) => store.auth)

    if (user) {
        return <Navigate to={'/main'} />
    }

    return <Outlet />
}

export default PublicProtected