import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock, Award, TrendingUp } from "lucide-react"
import { useClass } from "../services/ClassContext"

const examData = [
  { id: 1, nombre: "Examen 1: Introducción", nota: 5, fecha: "10 Mar", tiempo: 25 },
  { id: 2, nombre: "Examen 2: Conceptos básicos", nota: 7, fecha: "17 Mar", tiempo: 32 },
  { id: 3, nombre: "Examen 3: Aplicación práctica", nota: 5, fecha: "24 Mar", tiempo: 28 },
  { id: 4, nombre: "Examen 4: Casos de estudio", nota: 8, fecha: "31 Mar", tiempo: 35 },
  { id: 5, nombre: "Examen 4: Casos de estudio", nota: 8, fecha: "31 Mar", tiempo: 35 },
  { id: 6, nombre: "Examen 4: Casos de estudio", nota: 8, fecha: "31 Mar", tiempo: 35 },
  { id: 7, nombre: "Examen 4: Casos de estudio", nota: 8, fecha: "31 Mar", tiempo: 35 },
  { id: 8, nombre: "Examen 4: Casos de estudio", nota: 8, fecha: "31 Mar", tiempo: 35 },
]

const StudentClassResults = () => {
  const [selectedExam, setSelectedExam] = useState(null)
  const {
    results,
    fetchResults,
    loadingResults
  } = useClass();

  useEffect(() => {
    if (results.length === 0) {
      fetchResults();
    }else{
      console.log(results)
    }
  }, []);

  if (loadingResults) {
    return <p className="text-center py-6">Cargando resultados...</p>;
  }

  if (results.length === 0) {
    return <p className="text-center py-6">No hay resultados aún.</p>;
  }

  const chartData = results.map((exam) => ({
  name: `Examen ${exam.id}`,
  nota: exam.nota,
  }));

  const notaMedia = (results.reduce((sum, exam) => sum + exam.nota, 0) / results.length).toFixed(1);

  const tiempoMedio = Math.round(results.reduce((sum, exam) => sum + exam.tiempo, 0) / results.length);

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

    return (
        <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Columna izquierda: Nota media y lista de exámenes */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
          {/* Tarjeta de nota media */}
          <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl p-6 border shadow-lg">
            <h2 className="text-lg text-purple-700 dark:text-purple-300 mb-2 font-medium">Nota Media</h2>
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="bg-purple-600 rounded-full w-24 h-24 flex items-center justify-center mr-4"
              >
                <span className="text-3xl font-bold text-white">{notaMedia}</span>
              </motion.div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">sobre 10</p>
                <div className="mt-2">
                  <Award className="text-purple-400 inline mr-1" size={16} />
                  <span className="text-sm text-purple-500 dark:text-purple-200">
                    {notaMedia >= 7 ? "Excelente progreso" : "Buen avance"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de exámenes */}
          <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl p-6 px-4 border shadow-lg">
            <h2 className="text-lg text-purple-700 dark:text-purple-300 mb-4 font-medium">Últimos Exámenes</h2>
            <div className="space-y-3 max-h-[290px] overflow-y-auto">
                <div className="flex flex-col gap-4 scroll-x-hidden" style={{ scrollBehavior: "smooth" }}>
              {results.map((exam) => (
                <motion.div
                  key={exam.id}
                  whileHover={{ x: 5, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                  onClick={() => setSelectedExam(exam)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedExam?.id === exam.id
                      ? "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="truncate pr-2">
                      <p className="font-medium">{exam.nombre}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {exam.fecha} • {exam.tiempo} min
                      </p>
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        exam.nota >= 8
                          ? "text-indigo-700 dark:text-indigo-400"
                          : exam.nota >= 6
                            ? "text-purple-700 dark:text-purple-500"
                            : "text-purple-600 dark:text-purple-300"
                      }`}
                    >
                      {exam.nota}
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Columna derecha: Gráfico y tiempo medio */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Gráfico de evolución */}
          <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl p-6 border shadow-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-purple-500 mr-2" />
              <h2 className="text-lg text-purple-700 dark:text-purple-300 font-medium">Evolución de Notas</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis domain={[0, 10]} stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--tooltip-bg, #ffffff)",
                      borderColor: "var(--tooltip-border, #e5e7eb)",
                      color: "var(--tooltip-color, #111827)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nota"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ stroke: "#8B5CF6", strokeWidth: 2, r: 6, fill: "var(--dot-fill, #ffffff)" }}
                    activeDot={{ stroke: "#C4B5FD", strokeWidth: 2, r: 8, fill: "#8B5CF6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tiempo medio y estadísticas */}
          <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl p-6 border shadow-lg">
            <div className="flex items-center mb-4">
              <Clock className="text-purple-500 mr-2" />
              <h2 className="text-lg text-purple-700 dark:text-purple-300 font-medium">Tiempo Medio</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 rounded-lg p-4 flex-1 border"
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-lavender-400">{tiempoMedio} min</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Tiempo promedio por examen</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 rounded-lg p-4 flex-1 border"
              >
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{results.length}</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Exámenes completados</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 rounded-lg p-4 flex-1 border"
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.max(...results.map((e) => e.nota))}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Nota más alta</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
};

export default StudentClassResults;
