import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/auth/Login'
import AdminLayout from './components/dashboard/DashboardLayout'
import Dashboard from './pages/admin/Dashboard'
import ProfesseursList from './pages/admin/Professeurs/List'
import PrivateRoute from './components/auth/PrivateRoute'



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="professeurs" element={<ProfesseursList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}