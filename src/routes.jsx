import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import ProfesseursList from './pages/admin/Professeurs/List';
import ProfesseurCreate from './pages/admin/Professeurs/Create';
import ProfesseurEdit from './pages/admin/Professeurs/Edit';
import EtudiantsList from './pages/admin/Etudiants/List';
import EtudiantCreate from './pages/admin/Etudiants/Create';
import EtudiantEdit from './pages/admin/Etudiants/Edit';
import ClassesList from './pages/admin/Classes/List';
import ClasseCreate from './pages/admin/Classes/Create';
import ClasseEdit from './pages/admin/Classes/Edit';
import CoursList from './pages/admin/Cours/List';
import CoursCreate from './pages/admin/Cours/Create';
import CoursEdit from './pages/admin/Cours/Edit';
import SeancesList from './pages/admin/Seances/List';
import SeanceCreate from './pages/admin/Seances/Create';
import SeanceEdit from './pages/admin/Seances/Edit';
import ExportEtudiants from './pages/admin/Exports/ListEtudiants';
import ExportPresences from './pages/admin/Exports/ListPresences';
import NotFound from './pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute allowedRoles={['Administrateur']} />}>
        <Route index element={<Dashboard />} />
        <Route path="professeurs" element={<ProfesseursList />} />
        <Route path="professeurs/create" element={<ProfesseurCreate />} />
        <Route path="professeurs/:id/edit" element={<ProfesseurEdit />} />
        <Route path="etudiants" element={<EtudiantsList />} />
        <Route path="etudiants/create" element={<EtudiantCreate />} />
        <Route path="etudiants/:id/edit" element={<EtudiantEdit />} />
        <Route path="classes" element={<ClassesList />} />
        <Route path="classes/create" element={<ClasseCreate />} />
        <Route path="classes/:id/edit" element={<ClasseEdit />} />
        <Route path="cours" element={<CoursList />} />
        <Route path="cours/create" element={<CoursCreate />} />
        <Route path="cours/:id/edit" element={<CoursEdit />} />
        <Route path="seances" element={<SeancesList />} />
        <Route path="seances/create" element={<SeanceCreate />} />
        <Route path="seances/:id/edit" element={<SeanceEdit />} />
        <Route path="exports/etudiants/:classeId" element={<ExportEtudiants />} />
        <Route path="exports/presences/:seanceId" element={<ExportPresences />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;