import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClasse, exportEtudiantsClasse } from '../../../services/classes';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';

export default function ExportEtudiants() {
  const { classeId } = useParams();
  const [classe, setClasse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClasse(classeId);
        setClasse(data);
      } catch (err) {
        setError('Erreur lors du chargement de la classe');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [classeId]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await exportEtudiantsClasse(classeId);
      // Créer un lien temporaire pour télécharger le fichier
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `etudiants_${classe.nom}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Erreur lors de l\'export');
    } finally {
      setExporting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Export des étudiants - {classe?.nom}
          </h1>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Cette classe contient {classe?.effectif} étudiants.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleExport}
            loading={exporting}
          >
            Exporter au format Excel
          </Button>
        </div>
      </div>
    </div>
  );
}