import api from './api';

export const getEtudiants = async () => {
  const response = await api.get('/api/etudiants/');
  return response.data;
};

export const getEtudiant = async (id) => {
  const response = await api.get(`/api/etudiants/${id}/`);
  return response.data;
};

export const createEtudiant = async (etudiantData) => {
  const response = await api.post('/api/etudiants/', etudiantData);
  return response.data;
};

export const updateEtudiant = async (id, etudiantData) => {
  const response = await api.put(`/api/etudiants/${id}/`, etudiantData);
  return response.data;
};

export const deleteEtudiant = async (id) => {
  const response = await api.delete(`/api/etudiants/${id}/`);
  return response.data;
};