import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/shared/functions/axiosConfig';
import Layout from '../../../shared/components/Layout';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

export default function ExamSubmissionsPage() {
  const { testId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`/teacher/test/${testId}/submissions`);
        setStudents(res.data);
      } catch (error) {
        console.error('Error al cargar los alumnos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [testId]);

  return (
    <Layout isTeacher>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition duration-200"
          >
            ← Volver atrás
          </button>

          <h1 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300">
            Alumnos del examen #{testId}
          </h1>

          {loading ? (
            <p>Cargando alumnos...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
              <tr className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4 text-center">Estado</th>
                <th className="py-2 px-4 text-center">Acciones</th>
              </tr>
              </thead>
              <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b border-gray-100 dark:border-gray-700"
                >
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.email}</td>
                  <td className="py-2 px-4 text-center">
                    {student.has_attempted ? (
                      <span className="flex justify-center items-center gap-1 text-green-600">
                          <CheckCircle className="w-5 h-5" /> Entregado
                        </span>
                    ) : (
                      <span className="flex justify-center items-center gap-1 text-red-500">
                          <XCircle className="w-5 h-5" /> Sin responder
                        </span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {student.has_attempted && (
                      <button
                        onClick={() =>
                          navigate(`/teacher/test/${testId}/submissions/${student.id}`)
                        }
                        className="inline-flex items-center gap-1 bg-purple-600 text-white text-sm px-3 py-1.5 rounded hover:bg-purple-700"
                      >
                        <Eye className="w-4 h-4" /> Corregir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
