import api from './api';

export const getSeances = async () => {
  const response = await api.get('/api/seances/');
  return response.data;
};

export const getSeance = async (id) => {
  const response = await api.get(`/api/seances/${id}/`);
  return response.data;
};

export const createSeance = async (seanceData) => {
  const response = await api.post('/api/seances/', seanceData);
  return response.data;
};

export const updateSeance = async (id, seanceData) => {
  const response = await api.put(`/api/seances/${id}/`, seanceData);
  return response.data;
};

export const deleteSeance = async (id) => {
  const response = await api.delete(`/api/seances/${id}/`);
  return response.data;
};