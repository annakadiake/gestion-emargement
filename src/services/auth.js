import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/auth/login/', credentials)
  localStorage.setItem('token', response.data.access)
  return response.data.user
}

export const logout = async () => {
  await api.post('/auth/logout/')
  localStorage.removeItem('token')
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/user/')
    return response.data
  } catch (error) {
    throw error
  }
}