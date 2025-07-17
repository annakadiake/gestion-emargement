import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: HomeIcon },
    { name: 'Professeurs', href: '/admin/professeurs', icon: UsersIcon },
    { name: 'Étudiants', href: '/admin/etudiants', icon: AcademicCapIcon },
    { name: 'Classes', href: '/admin/classes', icon: UsersIcon },
    { name: 'Cours', href: '/admin/cours', icon: BookOpenIcon },
    { name: 'Séances', href: '/admin/seances', icon: CalendarIcon },
    { name: 'Exports', href: '/admin/exports', icon: DocumentTextIcon },
    { name: 'Paramètres', href: '/admin/settings', icon: CogIcon },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-primary">Gestion Émargement</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    location.pathname === item.href
                      ? 'text-primary-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}