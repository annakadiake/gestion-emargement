import api from './api';

export const getProfesseurs = async () => {
  const response = await api.get('/professeurs/');
  return response.data;
};

export const getProfesseur = async (id) => {
  const response = await api.get(`/professeurs/${id}/`);
  return response.data;
};

export const createProfesseur = async (professeurData) => {
  const response = await api.post('/professeurs/', professeurData);
  return response.data;
};

export const updateProfesseur = async (id, professeurData) => {
  const response = await api.put(`/professeurs/${id}/`, professeurData);
  return response.data;
};

export const deleteProfesseur = async (id) => {
  const response = await api.delete(`/professeurs/${id}/`);
  return response.data;
};