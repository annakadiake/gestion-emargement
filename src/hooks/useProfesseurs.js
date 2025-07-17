import { useState, useEffect } from 'react';
import { getProfesseurs } from '../services/professeurs';

export function useProfesseurs() {
  const [professeurs, setProfesseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfesseurs();
        setProfesseurs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { professeurs, loading, error };
}