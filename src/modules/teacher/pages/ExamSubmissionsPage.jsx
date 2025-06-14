import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/shared/functions/axiosConfig';
import Layout from '../../../shared/components/Layout';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="text-sm px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition duration-200"
          >
            ← Volver atrás
          </motion.button>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center gap-2"
          >
            Alumnos del examen #{testId}
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-purple-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </motion.h1>

          {loading ? (
            <p>Cargando alumnos...</p>
          ) : (
            <motion.table
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full text-left border-collapse"
            >
              <thead>
              <tr className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4 text-center">Estado</th>
                <th className="py-2 px-4 text-center">Acciones</th>
              </tr>
              </thead>
              <tbody>
              {students.map((student, i) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          navigate(`/teacher/test/${testId}/submissions/${student.id}`)
                        }
                        className="inline-flex items-center gap-1 bg-purple-600 text-white text-sm px-3 py-1.5 rounded hover:bg-purple-700"
                      >
                        <Eye className="w-4 h-4" /> Corregir
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
              </tbody>
            </motion.table>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );

}
