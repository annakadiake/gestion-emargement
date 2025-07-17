// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'
import { login as apiLogin, logout as apiLogout, getCurrentUser } from '../services/auth'

// ✅ Crée et exporte le contexte ici
export const AuthContext = createContext()

// ✅ Fournisseur de contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (credentials) => {
    const userData = await apiLogin(credentials)
    setUser(userData)
    return userData
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

// ✅ Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext)
