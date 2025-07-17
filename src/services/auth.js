import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/login', credentials)
  localStorage.setItem('token', response.data.access)
  return response.data.user
}

export const logout = async () => {
  await api.post('/logout')
  localStorage.removeItem('token')
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/user')
    return response.data
  } catch (error) {
    throw error
  }
}