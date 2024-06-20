import React from 'react'
//Outlet acts as a placeholder for child routes within a parent route
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

const PrivateRoutes = () => {
    const { currentUser } = useAuth() //using useAuth from Auth

  return (
    //this line is to check if the currentUser authenticated.
    //if so, go to the parent route. If not, go to login page
    currentUser ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes