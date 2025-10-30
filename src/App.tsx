import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import SkinPage from './pages/SkinPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/upload" element={<ProtectedRoute requireRole="creator"><UploadPage/></ProtectedRoute>} />
        <Route path="/profile/:uid" element={<ProfilePage/>} />
        <Route path="/skin/:id" element={<SkinPage/>} />
        <Route path="/admin" element={<ProtectedRoute requireRole="admin"><AdminPage/></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App

