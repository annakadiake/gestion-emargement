import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClasse, updateClasse } from '../../../services/classes';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function ClasseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    effectif: 0
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClasse(id);
        setFormData({
          nom: data.nom,
          effectif: data.effectif
        });
      } catch (err) {
        setError('Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await updateClasse(id, formData);
      navigate('/admin/classes');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Modifier la classe</h1>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Input
                label="Nom de la classe"
                name="nom"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                required
              />
            </div>
            
            <div className="sm:col-span-2">
              <Input
                label="Effectif"
                name="effectif"
                type="number"
                min="0"
                value={formData.effectif}
                onChange={(e) => setFormData({...formData, effectif: parseInt(e.target.value) || 0})}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/classes')}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              loading={submitting}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}