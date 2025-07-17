import api from './api';

export const getEtudiants = async () => {
  const response = await api.get('/etudiants/');
  return response.data;
};

export const getEtudiant = async (id) => {
  const response = await api.get(`/etudiants/${id}/`);
  return response.data;
};

export const createEtudiant = async (etudiantData) => {
  const response = await api.post('/etudiants/', etudiantData);
  return response.data;
};

export const updateEtudiant = async (id, etudiantData) => {
  const response = await api.put(`/etudiants/${id}/`, etudiantData);
  return response.data;
};

export const deleteEtudiant = async (id) => {
  const response = await api.delete(`/etudiants/${id}/`);
  return response.data;
};