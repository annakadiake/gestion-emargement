import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSeances } from '../../../services/seances';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';

export default function SeancesList() {
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSeances();
        setSeances(data);
      } catch (err) {
        setError('Erreur lors du chargement des séances');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { 
      header: 'Matière', 
      accessor: 'cours.matiere' 
    },
    { 
      header: 'Classe', 
      accessor: 'classe.nom' 
    },
    { 
      header: 'Date', 
      accessor: 'date',
      render: (row) => new Date(row.date).toLocaleDateString('fr-FR')
    },
    { 
      header: 'Heure', 
      accessor: 'heure',
      render: (row) => `${row.heure_debut} - ${row.heure_fin}`
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: (row) => (
        <div className="space-x-2">
          <Link to={`/seances/${row.id}/edit`}>
            <Button variant="outline" size="sm">Modifier</Button>
          </Link>
          <Link to={`/exports/presences/${row.id}`}>
            <Button variant="outline" size="sm">Émargement</Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Liste des séances</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/seances/create">
            <Button>Créer une séance</Button>
          </Link>
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

      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Chargement en cours...</div>
        ) : (
          <Table 
            columns={columns} 
            data={seances} 
            emptyMessage="Aucune séance trouvée"
          />
        )}
      </div>
    </div>
  );
}