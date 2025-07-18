import api from './api';

export const getProfesseurs = async () => {
  const response = await api.get('/api/professeurs/');
  return response.data;
};

export const getProfesseur = async (id) => {
  const response = await api.get(`/api/professeurs/${id}/`);
  return response.data;
};

export const createProfesseur = async (professeurData) => {
  const response = await api.post('/api/professeurs/', professeurData);
  return response.data;
};

export const updateProfesseur = async (id, professeurData) => {
  const response = await api.put(`/api/professeurs/${id}/`, professeurData);
  return response.data;
};

export const deleteProfesseur = async (id) => {
  const response = await api.delete(`/api/professeurs/${id}/`);
  return response.data;
};