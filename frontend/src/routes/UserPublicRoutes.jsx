import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function UserPublicRoutes() {
    const authState = useSelector(state=>state.auth);
    return (
        authState.auth?<Navigate to='/home'/>:<Outlet/>
    )
}

export default UserPublicRoutes
