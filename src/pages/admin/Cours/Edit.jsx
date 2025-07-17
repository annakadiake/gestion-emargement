import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCoursById, updateCours } from '../../../services/cours';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function CoursEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matiere: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoursById(id);
        setFormData({
          matiere: data.matiere
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
      await updateCours(id, formData);
      navigate('/admin/cours');
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
          <h1 className="text-xl font-semibold text-gray-900">Modifier le cours</h1>
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
                label="Matière"
                name="matiere"
                value={formData.matiere}
                onChange={(e) => setFormData({...formData, matiere: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/cours')}
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