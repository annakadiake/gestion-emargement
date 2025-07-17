import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../ui/Loader';
import { toast } from 'react-hot-toast';

/**
 * Composant pour protéger les routes nécessitant une authentification
 * @param {Object} props 
 * @param {ReactNode} props.children - Contenu à afficher si authentifié
 * @param {Array} [props.allowedRoles] - Rôles autorisés (par défaut tous les rôles)
 * @param {boolean} [props.adminOnly] - Si vrai, limite aux administrateurs
 * @param {boolean} [props.redirectToHome] - Rediriger vers '/' plutôt que '/login'
 * @returns {ReactNode} Composant protégé ou redirection
 */
export default function PrivateRoute({ 
  children, 
  allowedRoles = [], 
  adminOnly = false,
  redirectToHome = false,
  ...rest 
}) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    // Redirection après login
    const redirectPath = location.pathname + location.search;
    return (
      <Navigate 
        to={redirectToHome ? '/' : `/login?redirect=${encodeURIComponent(redirectPath)}`} 
        replace 
        state={{ from: location }}
      />
    );
  }

  // Vérification des rôles
  const hasRequiredRole = adminOnly 
    ? user?.role === 'Administrateur'
    : allowedRoles.length === 0 || allowedRoles.includes(user?.role);

  if (!hasRequiredRole) {
    toast.error("Vous n'avez pas les droits nécessaires");
    return <Navigate to="/" replace />;
  }

  return children;
}