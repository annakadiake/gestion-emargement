import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Bienvenue, {user?.prenom} {user?.nom}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Vous êtes connecté en tant qu'administrateur.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard