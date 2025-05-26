import { useEffect, useState } from 'react';
import Layout from '../../../shared/components/Layout';
import { Routes, Route, useParams, Outlet, NavLink } from 'react-router-dom';
import { BookOpen, FileText, BarChart, Users, MessageSquare } from 'lucide-react';
import { ClassProvider } from '../services/ClassContext';

const navItems = [
  { label: 'Actividades', value: 'activities', icon: FileText },
  { label: 'Resultados', value: 'results', icon: BarChart },
  { label: 'Participantes', value: 'members', icon: Users },
  { label: 'Chat', value: 'chat', icon: MessageSquare },
];

const StudentClassLayout = ({ className: passedClassName }) => {
  const [className, setClassName] = useState(() => {
    return passedClassName || localStorage.getItem('selectedClassName') || 'Clase';
  });

  useEffect(() => {
    if (className) {
      document.title = className;
    }
  }, [className]);

  return (
    <Layout isStudent>
      <ClassProvider>
        <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow">
          {/* Título de la clase */}
          <div className="bg-white dark:bg-gray-800 py-4 pl-6 pr-4 md:pl-8 md:pr-6 lg:pl-8 lg:pr-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{className}</h2>
              </div>
              <a
                href="/student/dashboard"
                className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
              >
                ← Volver
              </a>
            </div>
          </div>

          {/* Contenido y navegación */}
          <div className="flex flex-col md:flex-row-reverse min-h-[500px]">
            {/* Sidebar */}
            <aside className="w-full md:w-64 p-6 bg-white dark:bg-gray-800">
              <nav className="flex flex-col gap-3">
                {navItems.map(({ label, icon: Icon, value }) => (
                  <NavLink
                    key={value}
                    to={value}
                    className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition
            ${
              isActive
                ? 'bg-purple-600 text-white scale-[1.05] shadow-md'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800'
            }
        `}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 p-6 md:p-8 bg-purple-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </ClassProvider>
    </Layout>
  );
};

export default StudentClassLayout;
