// src/components/PublicRoute.js

import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PublicRoute = ({ children }) => {
  const {loading, currentUser} = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <></>  // Or some other loading indicator
  }

  return !currentUser ? children : <Navigate to="/" replace />
}

export default PublicRoute
