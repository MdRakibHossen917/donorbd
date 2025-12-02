import { Navigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { t } = useLanguage()
  
  // For demo purposes, always allow access
  // In real app, check authentication here
  const isAuthenticated = true
  const isAdmin = true // For demo

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default ProtectedRoute

