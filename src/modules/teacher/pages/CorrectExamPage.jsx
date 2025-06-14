import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/shared/functions/axiosConfig';
import Layout from '../../../shared/components/Layout';
import { motion } from 'framer-motion';

export default function CorrectStudentExam() {
  const { testId, studentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/teacher/test/${testId}/submissions/${studentId}`);
        setQuestions(res.data.questions);
        console.log(res.data.questions);
        const initialMarks = {};
        res.data.questions.forEach((q) => {
          if (q.type === 'text') {
            initialMarks[q.question_id] = q.mark ?? '';
          }
        });
        setMarks(initialMarks);
      } catch (err) {
        console.error('Error cargando respuestas del alumno', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [testId, studentId]);

  const handleChange = (questionId, value) => {
    setMarks((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(marks).length === 0) {
      alert('Este examen no contiene preguntas de desarrollo que necesiten corrección manual.');
      return;
    }

    try {
      await axios.post(`/teacher/test/${testId}/submissions/${studentId}/grade`, { marks });
      alert('Notas guardadas correctamente.');
      navigate(-1);
    } catch (err) {
      console.error('Error al guardar notas', err);
      alert('Ocurrió un error al guardar las notas.');
    }
  };


  const renderContent = (q) => {
    if (!q.content) return null;

    if (q.type === 'fill_blank') {
      const text = typeof q.title === 'string' ? q.title : '';
      const studentAnswers = Array.isArray(q.answer) ? q.answer : [];

      const parts = text.split(/\[🔲(\d+)\]/g);

      return (
        <p className="whitespace-pre-wrap leading-relaxed">
          {parts.map((part, idx) => {
            if (idx % 2 === 0) {
              return part;
            } else {
              const blankIndex = parseInt(part, 10) - 1;
              const response = studentAnswers[blankIndex] ?? '—';
              return (
                <span
                  key={idx}
                  className="inline-block px-2 py-0.5 mx-1 bg-yellow-100 text-yellow-800 rounded-md font-mono text-sm border border-yellow-300"
                >
              {response}
            </span>
              );
            }
          })}
        </p>
      );
    }


    if (q.type === 'match' && Array.isArray(q.content)) {
      return (
        <ul className="list-disc pl-5">
          {q.content.map((pair, idx) => (
            <li key={idx}>
              <strong>{pair.left}</strong> → {pair.right}
            </li>
          ))}
        </ul>
      );
    }

    if (['multiple_choice', 'multiple_response'].includes(q.type) && Array.isArray(q.content)) {
      return (
        <ul className="list-disc pl-5">
          {q.content.map((opt, idx) => (
            <li key={idx}>
              {opt.option}
              {opt.correct && <span className="ml-2 text-green-500">(correcta)</span>}
            </li>
          ))}
        </ul>
      );
    }

    if (['text', 'short_answer'].includes(q.type) && typeof q.content === 'string') {
      return <p className="whitespace-pre-wrap">{q.content}</p>;
    }

    return (
      <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
        {typeof q.content === 'string'
          ? q.content
          : JSON.stringify(q.content, null, 2)}
      </p>
    );
  };

  return (
    <Layout isTeacher>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
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
            className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300"
          >
            Corrección del examen #{testId} del alumno #{studentId}
          </motion.h1>

          {loading ? (
            <p>Cargando preguntas...</p>
          ) : (
            <div className="space-y-6">
              {questions.map((q, index) => (
                <motion.div
                  key={q.question_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 border rounded
                ${q.type !== 'text' && q.mark > 0 ? 'bg-green-100 dark:bg-green-900/30 border-green-400' : ''}
                ${q.type !== 'text' && q.mark === 0 ? 'bg-red-100 dark:bg-red-900/30 border-red-400' : ''}
                ${q.type === 'text' || q.mark === null ? 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-700' : ''}
                `}
                >
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300">
                    {index + 1}. {q.title}
                  </h3>

                  <div className="mt-2 mb-3 text-sm text-gray-700 dark:text-gray-300">
                    {renderContent(q)}
                  </div>

                  {['single', 'multiple'].includes(q.type) ? (() => {
                    let opts = [];

                    try {
                      if (q.options && typeof q.options === 'object' && Array.isArray(q.options.options)) {
                        opts = q.options.options;
                      }
                    } catch {
                      opts = [];
                    }

                    const selected = q.answer?.selected;

                    return (
                      <div className="mt-2">
                        <strong>Opciones:</strong>
                        <ul className="mt-1 pl-5 list-disc text-sm">
                          {opts.map((opt, idx) => {
                            const isSelected = q.type === 'single'
                              ? selected === idx || selected === opt || selected == opt
                              : Array.isArray(selected) && (selected.includes(idx) || selected.includes(opt));

                            return (
                              <li
                                key={idx}
                                className={`py-1 ${
                                  isSelected ? 'font-semibold text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                {opt}
                                {isSelected && <span className="ml-2">(seleccionada)</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })() : q.type === 'match' && Array.isArray(q.answer?.matches) ? (
                    <div className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                      <strong>Respuesta:</strong>
                      <ul className="mt-1 pl-5 list-disc">
                        {q.answer.matches.map((pair, idx) => (
                          <li key={idx}>
                            {pair.left} → {pair.right}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                      <strong>Respuesta:</strong>{' '}
                      {q.answer === null || q.answer === undefined ? (
                        <em>No respondida</em>
                      ) : typeof q.answer === 'string' ? (
                        q.answer
                      ) : Array.isArray(q.answer) ? (
                        q.answer.join(', ')
                      ) : typeof q.answer === 'object' ? (
                        Object.values(q.answer).join(', ')
                      ) : (
                        String(q.answer)
                      )}
                    </p>
                  )}

                  {q.type === 'text' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-1">Nota (0-10)</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={marks[q.question_id] ?? ''}
                        onChange={(e) => handleChange(q.question_id, e.target.value)}
                        className="w-24 px-3 py-1 border rounded bg-white dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                className="text-right mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow"
                >
                  Guardar notas
                </motion.button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );

}
