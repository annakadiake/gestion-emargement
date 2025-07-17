import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(credentials);
      toast.success('Connexion réussie');
      navigate('/admin');
    } catch (error) {
      toast.error('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Input
          label="Login"
          name="login"
          type="text"
          value={credentials.login}
          onChange={(e) => setCredentials({...credentials, login: e.target.value})}
          required
          autoFocus
        />
      </div>

      <div>
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
      </div>

      <div>
        <Button 
          type="submit" 
          className="w-full" 
          loading={loading}
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
}