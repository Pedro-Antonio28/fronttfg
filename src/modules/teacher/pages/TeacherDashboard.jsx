import { useEffect, useState } from 'react';
import { fetchDashboard } from '../services/teacherService.js';
import Layout from '../../../shared/components/Layout';
import ClassesGrid from '../../../shared/components/ClassesGrid.jsx';

const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboard(currentPage);
        setClasses(data.data);
        setLastPage(data.meta.last_page);
        console.log(data);
      } catch (error) {
        // ya se maneja el error en el servicio
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [refreshTrigger, currentPage]);

  if (loading) {
    return (
      <div className="text-center py-8 text-lg font-medium text-gray-700">
        Cargando tus clases...
      </div>
    );
  }

  return (
    <Layout isTeacher={true}>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Mis Clases</h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta Profesor!. Aquí están todas tus clases actuales.
          </p>
        </div>

        <ClassesGrid
          classes={classes}
          rol="teacher"
          showAddButton={true}
          onClassCreated={() => {
            setCurrentPage(1); // Volver a la primera página al crear
            setRefreshTrigger((prev) => prev + 1);
          }}
        />

        {/* Paginación */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-2 text-gray-700 dark:text-slate-300">
            Página {currentPage} de {lastPage}
          </span>
          <button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
      {/* <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Tus clases</h1>

      {classes.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No estás inscrito en ninguna clase aún.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classItem, index) => (
            <li
              key={index}
              className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200 bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {classItem.class_name}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Código: <span className="italic">CL-{index + 1001}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div> */}
    </Layout>
  );
};

export default TeacherDashboard;
