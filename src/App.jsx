import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import { Toaster } from 'react-hot-toast'
import Login from './pages/auth/Login'
import AdminLayout from './components/dashboard/DashboardLayout'
import Dashboard from './pages/admin/Dashboard'
import ProfesseursList from './pages/admin/Professeurs/List'
import ProfesseurCreate from './pages/admin/Professeurs/Create'
import ProfesseurEdit from './pages/admin/Professeurs/Edit'
import PrivateRoute from './components/auth/PrivateRoute'


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="professeurs" element={<ProfesseursList />} />
            <Route path="professeurs/create" element={<ProfesseurCreate />} />
            <Route path="professeurs/:id/edit" element={<ProfesseurEdit />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}