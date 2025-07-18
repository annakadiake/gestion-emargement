import api from './api';

export const getCours = async () => {
  const response = await api.get('/api/cours/');
  return response.data;
};

export const getCoursById = async (id) => {
  const response = await api.get(`/api/cours/${id}/`);
  return response.data;
};

export const getCoursWithDetails = async () => {
  const response = await api.get('/api/cours/?details=true');
  return response.data;
};

export const createCours = async (coursData) => {
  const response = await api.post('/api/cours/', coursData);
  return response.data;
};

export const updateCours = async (id, coursData) => {
  const response = await api.put(`/api/cours/${id}/`, coursData);
  return response.data;
};

export const deleteCours = async (id) => {
  const response = await api.delete(`/api/cours/${id}/`);
  return response.data;
};