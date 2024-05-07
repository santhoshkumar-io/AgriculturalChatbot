// src/components/ProtectedRoute.js

import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { loading, currentUser } = useAuth()
  if (loading) {
    return <></> // Or some other loading indicator
  }
  return currentUser ? children : <Navigate to="/signin" replace />
}

export default ProtectedRoute
