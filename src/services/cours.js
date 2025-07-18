import api from './api';

export const getCours = async () => {
  const response = await api.get('/cours/');
  return response.data;
};

export const getCoursById = async (id) => {
  const response = await api.get(`/cours/${id}/`);
  return response.data;
};

export const getCoursWithDetails = async () => {
  const response = await api.get('/cours/?details=true');
  return response.data;
};

export const createCours = async (coursData) => {
  const response = await api.post('/cours/', coursData);
  return response.data;
};

export const updateCours = async (id, coursData) => {
  const response = await api.put(`/cours/${id}/`, coursData);
  return response.data;
};

export const deleteCours = async (id) => {
  const response = await api.delete(`/cours/${id}/`);
  return response.data;
};