import { useEffect, useState } from 'react';
import Calendar from '../../../shared/components/Calendar'; // Asegúrate de que la ruta coincida con tu estructura

const getClassIdFromUrl = () => {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1];
};

const StudentClassActivities = () => {
  const classId = getClassIdFromUrl();
  const [className, setClassName] = useState('Clase');
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`/api/student/classes/${classId}`, {
          headers: { Accept: 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Error al obtener la clase');

        const data = await res.json();
        setClassName(data.data.class_name || `Clase ${classId}`);
        document.title = data.data.class_name || `Clase ${classId}`;
      } catch (error) {
        console.error('No se pudo cargar la clase:', error);
      }
    };

    const fetchTests = async () => {
      try {
        const res = await fetch(`/api/student/classes/${classId}/tests`, {
          headers: { Accept: 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Error al obtener los tests');

        const data = await res.json();
        setTests(data);
      } catch (error) {
        console.error('No se pudieron cargar los exámenes:', error);
      }
    };

    fetchClass();
    fetchTests();
  }, [classId]);

  const examDates = tests.map((t) => t.exam_date);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Tabla de exámenes */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Próximos exámenes</h2>
        {tests.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No hay exámenes programados.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300">
                <th className="py-2">Título</th>
                <th className="py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="py-2 text-gray-800 dark:text-gray-100">{test.title}</td>
                  <td className="py-2 text-gray-800 dark:text-gray-100">{test.exam_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Calendario */}
      <Calendar examDates={examDates} />
    </div>
  );
};

export default StudentClassActivities;
