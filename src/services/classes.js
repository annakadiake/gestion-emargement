import api from './api';

export const getClasses = async () => {
  const response = await api.get('/api/classes/');
  return response.data;
};

export const getClasse = async (id) => {
  const response = await api.get(`/api/classes/${id}/`);
  return response.data;
};

export const createClasse = async (classeData) => {
  const response = await api.post('/api/classes/', classeData);
  return response.data;
};

export const updateClasse = async (id, classeData) => {
  const response = await api.put(`/api/classes/${id}/`, classeData);
  return response.data;
};

export const deleteClasse = async (id) => {
  const response = await api.delete(`/api/classes/${id}/`);
  return response.data;
};