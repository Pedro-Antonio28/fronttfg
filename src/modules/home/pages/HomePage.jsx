import {
  BookOpen,
  Users,
  BarChart3,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'motion/react';
import Layout from '@/shared/components/Layout.jsx';
import results from '@/shared/assets/images/results.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Variantes de animación
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              La nueva forma de
              <span className="text-purple-600 dark:text-purple-400"> evaluar</span> en el aula
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Exámenes más serios. Resultados más claros.
              <br />
              Para profesores, alumnos y directores.
            </motion.p>

            {/* Login Buttons */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <Link to="/student/login">
                <motion.button
                  className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  variants={cardVariant}
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar sesión como Estudiante
                </motion.button>
              </Link>

              <Link to="/teacher/login">
                <motion.button
                  className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  variants={cardVariant}
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar sesión como Profesor
                </motion.button>
              </Link>

              <Link to="/director/login">
                <motion.button
                  className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  variants={cardVariant}
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar sesión como Director
                </motion.button>
              </Link>
            </motion.div>

            <motion.button
              onClick={() => scrollToSection('roles')}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ y: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Conoce más
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <ChevronDown className="w-5 h-5 ml-2" />
              </motion.div>
            </motion.button>
          </div>
        </section>

        {/* Roles Section */}
        <section
          id="roles"
          className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-300"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              Una plataforma para cada rol
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Estudiante */}
              <motion.div
                className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-colors shadow-lg hover:shadow-xl"
                variants={cardVariant}
                whileHover={{ y: -10, boxShadow: '0 10px 30px -15px rgba(139, 92, 246, 0.3)' }}
              >
                <div className="w-16 h-16 bg-purple-600 dark:bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  Estudiante
                </h3>
                <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
                  Realiza tus exámenes de forma digital y consulta tus resultados al instante.
                  Accede a tu historial académico y sigue tu progreso.
                </p>
              </motion.div>

              {/* Profesor */}
              <motion.div
                className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-colors shadow-lg hover:shadow-xl"
                variants={cardVariant}
                whileHover={{ y: -10, boxShadow: '0 10px 30px -15px rgba(139, 92, 246, 0.3)' }}
              >
                <div className="w-16 h-16 bg-purple-600 dark:bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  Profesor
                </h3>
                <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
                  Crea clases, diseña exámenes y corrige automáticamente. Analiza resultados y obtén
                  insights sobre el rendimiento de tus estudiantes.
                </p>
              </motion.div>

              {/* Director */}
              <motion.div
                className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-colors shadow-lg hover:shadow-xl"
                variants={cardVariant}
                whileHover={{ y: -10, boxShadow: '0 10px 30px -15px rgba(139, 92, 246, 0.3)' }}
              >
                <div className="w-16 h-16 bg-purple-600 dark:bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  Director
                </h3>
                <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
                  Supervisa toda la institución desde un panel general. Accede a estadísticas
                  globales y gestiona profesores y estudiantes.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h2
              className="text-4xl font-bold mb-16 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              Evaluación académica seria y profesional
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div className="flex items-start space-x-4" variants={fadeInUp}>
                  <div className="w-12 h-12 bg-purple-600 dark:bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Resultados en tiempo real
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300">
                      Obtén feedback inmediato y seguimiento del progreso académico.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start space-x-4" variants={fadeInUp}>
                  <div className="w-12 h-12 bg-purple-600 dark:bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Gestión integral
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300">
                      Administra clases, estudiantes y evaluaciones desde una sola plataforma.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start space-x-4" variants={fadeInUp}>
                  <div className="w-12 h-12 bg-purple-600 dark:bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      Corrección automática
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300">
                      Ahorra tiempo con sistemas de evaluación inteligentes y precisos.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <motion.figure
                  className="w-full aspect-[16/9] bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg overflow-hidden relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <motion.img
                    src={results}
                    alt="Vista previa del dashboard de resultados"
                    className="object-contain w-full h-full rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <motion.figcaption
                    className="absolute bottom-2 left-0 right-0 text-center text-sm text-purple-200 bg-black/30 py-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    Vista previa del dashboard
                  </motion.figcaption>
                </motion.figure>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is LUDUS Section */}
        <section
          id="que-es-ludus"
          className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-300"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h2
              className="text-4xl font-bold mb-8 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              ¿Qué es LUDUS?
            </motion.h2>
            <motion.div
              className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.p variants={fadeIn}>
                LUDUS es una plataforma educativa diseñada específicamente para instituciones
                académicas serias que buscan modernizar sus procesos de evaluación sin perder el
                rigor académico.
              </motion.p>
              <motion.p variants={fadeIn}>
                Desarrollada pensando en las necesidades reales de profesores, estudiantes y
                directores, LUDUS ofrece herramientas profesionales para la gestión integral de
                exámenes y resultados académicos.
              </motion.p>
              <motion.p variants={fadeIn}>
                Con LUDUS, las instituciones pueden digitalizar sus procesos de evaluación
                manteniendo la seriedad y profesionalismo que caracterizan a la educación de
                calidad.
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link to="/student/login">
                <motion.button
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Empieza ahora
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
