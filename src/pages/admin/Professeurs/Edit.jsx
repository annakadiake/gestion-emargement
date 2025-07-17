import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfesseur, updateProfesseur } from '../../../services/professeurs';
import { useCours } from '../../../hooks/useCours';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { toast } from 'react-hot-toast';

export default function ProfesseurEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cours, loading: coursLoading } = useCours();
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    login: '',
    password: '',
    cours: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfesseur(id);
        setFormData({
          prenom: data.user.prenom,
          nom: data.user.nom,
          login: data.user.login,
          password: '',
          cours: data.cours.map(c => c.id)
        });
      } catch (err) {
        setError('Erreur lors du chargement du professeur');
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
      await updateProfesseur(id, formData);
      toast.success('Professeur mis à jour avec succès');
      navigate('/admin/professeurs');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCoursChange = (selectedOptions) => {
    setFormData({
      ...formData,
      cours: selectedOptions.map(option => option.value)
    });
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Modifier le professeur</h1>
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
            <div className="sm:col-span-3">
              <Input
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                required
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                required
              />
            </div>
            
            <div className="sm:col-span-4">
              <Input
                label="Login"
                name="login"
                value={formData.login}
                onChange={(e) => setFormData({...formData, login: e.target.value})}
                required
              />
            </div>
            
            <div className="sm:col-span-4">
              <Input
                label="Nouveau mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Laisser vide pour ne pas modifier"
              />
            </div>
            
            <div className="sm:col-span-6">
              <Select
                label="Cours enseignés"
                name="cours"
                isMulti
                value={cours.filter(c => formData.cours.includes(c.id))}
                onChange={handleCoursChange}
                options={cours.map(c => ({ value: c.id, label: c.matiere }))}
                loading={coursLoading}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/professeurs')}
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