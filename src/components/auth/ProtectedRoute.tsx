import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children, requireRole }: { children: JSX.Element, requireRole?: 'creator' | 'reviewer' | 'admin' }){
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/auth" replace />
  if (requireRole && currentUser.role !== requireRole && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return children
}

