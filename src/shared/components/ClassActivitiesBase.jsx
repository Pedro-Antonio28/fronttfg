import { useEffect } from 'react';
import Calendar from './Calendar';
import { CalendarDays, Timer, Lock, Unlock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const ClassActivitiesBase = ({ useClassHook, showAddButton = false, onAddClick }) => {
  const { classId, activities, fetchActivities, loadingActivities, rol } = useClassHook();
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, [classId]);

  const examDates = activities.map((a) => ({
    date: a.exam_date,
    title: a.title,
  }));

  const isToday = (dateStr) => {
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return dateStr === localToday;
  };

  const getNextExam = () => {
    const today = new Date();
    return activities
      .filter((a) => new Date(a.exam_date) >= today)
      .sort((a, b) => new Date(a.exam_date) - new Date(b.exam_date))[0];
  };

  const daysUntil = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, easing: 'ease-out' }}
        className="flex flex-col md:flex-row gap-6"
      >
        {/* Lista de exámenes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays className="text-purple-500" />
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              Próximos exámenes
            </h2>
          </div>

          {loadingActivities ? (
            <p className="text-gray-500 dark:text-gray-300">Cargando...</p>
          ) : activities.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No hay exámenes programados.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-purple-50 dark:bg-purple-900/20">
                    <tr className="text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      <th className="py-2 px-3 font-semibold">Título</th>
                      <th className="py-2 px-3 font-semibold">Fecha</th>
                      <th className="py-2 px-3 font-semibold text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((test, index) => (
                      <motion.tr
                        key={test.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => {
                          if (rol === 'student') {
                            if (!test.is_published || test.has_attempt) return;
                          }
                          navigate(`/${rol}/class/${classId}/exam/${test.id}`);
                        }}
                        className={`group border-l-4 ${
                          isToday(test.exam_date)
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                            : 'border-transparent'
                        } border-t border-gray-100 dark:border-gray-700 hover:bg-purple-50/40 dark:hover:bg-purple-900/20 transition-colors cursor-pointer`}
                      >
                        <td className="py-2 px-3 text-gray-800 dark:text-gray-100">{test.title}</td>
                        <td className="py-2 px-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                          {test.exam_date}
                          {isToday(test.exam_date) && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Hoy
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center space-x-2">
                          <>
                            {rol === 'student' && test.has_attempt ? (
                              <CheckCircle
                                className="inline w-5 h-5 text-blue-500"
                                title="Ya realizado"
                              />
                            ) : test.is_published ? (
                              <Unlock className="inline w-5 h-5 text-green-500" title="Publicado" />
                            ) : (
                              <Lock className="inline w-5 h-5 text-red-500" title="Borrador" />
                            )}

                            {rol === 'teacher' && test.is_published ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/teacher/test/${test.id}/submissions`);
                                }}
                                className="ml-2 px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
                              >
                                Corregir
                              </button>
                            ) : null}
                          </>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {showAddButton && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/teacher/class/${classId}/add-exam`;
                    }}
                    className="w-16 h-16 rounded-full bg-purple-600 text-white text-5xl leading-none flex items-center justify-center shadow-xl transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl active:scale-95 focus:outline-none"
                    style={{ zIndex: 9999, position: 'relative' }}
                  >
                    +
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Calendario */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:w-1/3"
        >
          <Calendar examDates={examDates} />
        </motion.div>
      </motion.div>

      {/* Contador del próximo examen */}
      {activities.length > 0 &&
        (() => {
          const upcoming = getNextExam();
          return upcoming ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 mx-auto w-fit bg-purple-50 dark:bg-purple-900/10 px-6 py-4 rounded-xl shadow text-center flex items-center gap-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              >
                <Timer className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </motion.div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Próximo examen:
                </div>
                <div className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">
                  {upcoming.title} en {daysUntil(upcoming.exam_date)}{' '}
                  {daysUntil(upcoming.exam_date) === 1 ? 'día' : 'días'}
                </div>
              </div>
            </motion.div>
          ) : null;
        })()}
    </>
  );
};

export default ClassActivitiesBase;
