import api from './api';

export const exportEtudiantsClasse = async (classeId) => {
  const response = await api.get(`/export-list/classe/${classeId}/`, {
    responseType: 'blob'
  });
  return response;
};

export const exportPresencesClasse = async (seanceId) => {
  const response = await api.get(`/export-list/presence/classe/${seanceId}/`, {
    responseType: 'blob'
  });
  return response;
};