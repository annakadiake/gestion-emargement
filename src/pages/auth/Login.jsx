import LoginForm from '../../components/auth/LoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Connexion à l'administration
          </h2>
        </div>
        
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}