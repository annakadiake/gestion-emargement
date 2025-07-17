import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSeance } from '../../../services/seances';
import { useClasses } from '../../../hooks/useClasses';
import { useCours } from '../../../hooks/useCours';
import { useProfesseurs } from '../../../hooks/useProfesseurs';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import DatePicker from '../../../components/ui/DatePicker';

export default function SeanceCreate() {
  const navigate = useNavigate();
  const { classes, loading: classesLoading } = useClasses();
  const { cours, loading: coursLoading } = useCours();
  const { professeurs, loading: professeursLoading } = useProfesseurs();
  
  const [formData, setFormData] = useState({
    cours: '',
    classe: '',
    professeur: '',
    date: new Date(),
    heure_debut: '08:00',
    heure_fin: '09:00'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createSeance({
        ...formData,
        date: formData.date.toISOString().split('T')[0]
      });
      navigate('/admin/seances');
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
          <h1 className="text-xl font-semibold text-gray-900">Créer une séance</h1>
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
              <Select
                label="Cours"
                name="cours"
                value={formData.cours}
                onChange={(e) => setFormData({...formData, cours: e.target.value})}
                options={cours.map(c => ({ value: c.id, label: c.matiere }))}
                loading={coursLoading}
                required
              />
            </div>
            
            <div className="sm:col-span-3">
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
            
            <div className="sm:col-span-3">
              <Select
                label="Professeur"
                name="professeur"
                value={formData.professeur}
                onChange={(e) => setFormData({...formData, professeur: e.target.value})}
                options={professeurs.map(p => ({ 
                  value: p.id, 
                  label: `${p.user.prenom} ${p.user.nom}`
                }))}
                loading={professeursLoading}
                required
              />
            </div>
            
            <div className="sm:col-span-3">
              <DatePicker
                label="Date"
                selected={formData.date}
                onChange={(date) => setFormData({...formData, date})}
                required
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                label="Heure de début"
                name="heure_debut"
                type="time"
                value={formData.heure_debut}
                onChange={(e) => setFormData({...formData, heure_debut: e.target.value})}
                required
              />
            </div>
            
            <div className="sm:col-span-3">
              <Input
                label="Heure de fin"
                name="heure_fin"
                type="time"
                value={formData.heure_fin}
                onChange={(e) => setFormData({...formData, heure_fin: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/seances')}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              Créer la séance
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}