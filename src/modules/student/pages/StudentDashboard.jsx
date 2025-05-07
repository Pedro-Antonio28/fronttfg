import { useEffect, useState } from 'react';
import { fetchDashboard } from '../services/studentService';
import Layout from '../../../shared/components/Layout';
import ClassesGrid from '../components/ClassesGrid';


const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboard();
        setClasses(data);
      } catch (error) {
        // ya se maneja el error en el servicio
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-lg font-medium text-gray-700">
        Cargando tus clases...
      </div>
    );
  }

  return (
    <Layout isStudent={true}>
       <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Mis Clases</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta. Aquí están todas tus clases actuales.</p>
        </div>

        <ClassesGrid classes={classes} />
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

export default StudentDashboard;
