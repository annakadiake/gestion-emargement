import api from './api';

export const getClasses = async () => {
  const response = await api.get('/classes/');
  return response.data;
};

export const getClasse = async (id) => {
  const response = await api.get(`/classes/${id}/`);
  return response.data;
};

export const createClasse = async (classeData) => {
  const response = await api.post('/classes/', classeData);
  return response.data;
};

export const updateClasse = async (id, classeData) => {
  const response = await api.put(`/classes/${id}/`, classeData);
  return response.data;
};

export const deleteClasse = async (id) => {
  const response = await api.delete(`/classes/${id}/`);
  return response.data;
};