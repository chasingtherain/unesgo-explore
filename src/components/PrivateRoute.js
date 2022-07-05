import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function PrivateRoute() {
    const {user} = useAuthContext()

    return (
    <div>
        {/* if user is not logged in, direct them to sign up / sign in page; if logged in, direct to homepage */}
        {(!user) ? <Outlet/> : <Navigate to = "/"/>}
    </div>
    )
}
