import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEtudiant } from '../../../services/etudiants';
import { useClasses } from '../../../hooks/useClasses';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function EtudiantCreate() {
  const navigate = useNavigate();
  const { classes, loading: classesLoading } = useClasses();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    login: '',
    password: '',
    classe: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createEtudiant(formData);
      navigate('/admin/etudiants');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Ajouter un étudiant</h1>
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
                label="Mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <div className="sm:col-span-4">
              <Select
                label="Classe"
                name="classe"
                value={formData.classe}
                onChange={(e) => setFormData({...formData, classe: e.target.value})}
                options={classes.map(c => ({ value: c.id, label: c.nom }))}
                loading={classesLoading}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/etudiants')}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              Créer l'étudiant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}