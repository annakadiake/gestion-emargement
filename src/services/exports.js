import api from './api';

export const exportEtudiantsClasse = async (classeId) => {
  const response = await api.get(`/exports/etudiants/classe/${classeId}/`, {
    responseType: 'blob'
  });
  return response;
};

export const exportPresencesClasse = async (seanceId) => {
  const response = await api.get(`/exports/presences/seance/${seanceId}/`, {
    responseType: 'blob'
  });
  return response;
};