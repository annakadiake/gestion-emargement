import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEtudiants } from '../../../services/etudiants';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';

export default function EtudiantsList() {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEtudiants();
        setEtudiants(data);
      } catch (err) {
        setError('Erreur lors du chargement des étudiants');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { header: 'Matricule', accessor: 'matricule' },
    { header: 'Nom', accessor: 'user.nom' },
    { header: 'Prénom', accessor: 'user.prenom' },
    { header: 'Classe', accessor: 'classe.nom' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: (row) => (
        <div className="space-x-2">
          <Link to={`/etudiants/${row.id}/edit`}>
            <Button variant="outline" size="sm">Modifier</Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Liste des étudiants</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/etudiants/create">
            <Button>Ajouter un étudiant</Button>
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
            data={etudiants} 
            emptyMessage="Aucun étudiant trouvé"
          />
        )}
      </div>
    </div>
  );
}