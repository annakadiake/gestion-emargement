import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfesseurs, deleteProfesseur } from '../../../services/professeurs';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import { toast } from 'react-hot-toast';

export default function ProfesseursList() {
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProfesseur, setSelectedProfesseur] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfesseurs();
        setProfesseurs(data);
      } catch (err) {
        setError('Erreur lors du chargement des professeurs');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (professeur) => {
    setSelectedProfesseur(professeur);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProfesseur(selectedProfesseur.id);
      setProfesseurs(professeurs.filter(p => p.id !== selectedProfesseur.id));
      toast.success('Professeur supprimé avec succès');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Nom', 
      accessor: 'user',
      render: (user) => `${user.prenom} ${user.nom}`
    },
    { header: 'Login', accessor: 'user.login' },
    { header: 'Cours', 
      accessor: 'cours',
      render: (cours) => cours.map(c => c.matiere).join(', ') || 'Aucun'
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: (row) => (
        <div className="space-x-2">
          <Link to={`/admin/professeurs/${row.id}/edit`}>
            <Button variant="outline" size="sm">Modifier</Button>
          </Link>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => handleDeleteClick(row)}
          >
            Supprimer
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Liste des professeurs</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestion des professeurs et de leurs affectations aux cours
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/admin/professeurs/create">
            <Button>Ajouter un professeur</Button>
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
            data={professeurs} 
            emptyMessage="Aucun professeur trouvé"
          />
        )}
      </div>

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirmer la suppression"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="danger" className="ml-2" onClick={confirmDelete}>
              Confirmer
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-500">
          Êtes-vous sûr de vouloir supprimer le professeur {selectedProfesseur?.user.prenom} {selectedProfesseur?.user.nom} ?
          Cette action est irréversible.
        </p>
      </Modal>
    </div>
  );
}