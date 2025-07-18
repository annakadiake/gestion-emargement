import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expirée, veuillez vous reconnecter');
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Une erreur est survenue');
    }
    return Promise.reject(error);
  }
);

export default api;