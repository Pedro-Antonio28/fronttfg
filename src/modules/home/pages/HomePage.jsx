import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Header from '@/shared/components/Header';
import Feature from '@/shared/components/Feature';
import Testimonial from '@/shared/components/Testimonial';
import Footer from '@/shared/components/Footer';

const HomePage = () => {
    const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 7) setGreeting('Buenas noches');
    else if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Hero */}
      <section className="text-center py-24 px-6 bg-gray-50">
      <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-medium text-gray-500 mb-2"
        >
          {greeting}, bienvenido a LUDUS 👋
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-700"
        >
          Evalúa, enseña y motiva con LUDUS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 max-w-xl mx-auto mb-8"
        >
          La plataforma educativa que transforma tus clases en experiencias interactivas con estadísticas y motivación.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/register"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Empieza gratis
        </motion.a>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">¿Qué ofrece LUDUS?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature icon="🧠" title="Clases inteligentes" desc="Organiza tus clases y visualiza el progreso del alumnado." />
          <Feature icon="📝" title="Exámenes personalizados" desc="Crea exámenes variados con múltiples tipos de preguntas." />
          <Feature icon="📊" title="Estadísticas en tiempo real" desc="Analiza resultados al instante con gráficas claras y útiles." />
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="py-20 bg-gray-100 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Lo que opinan los docentes</h3>
        <div className="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
          <Testimonial name="María P." text="Con LUDUS mis clases han mejorado. Los alumnos están motivados y yo tengo control total de su progreso." />
          <Testimonial name="Carlos G." text="Es muy fácil crear exámenes y ver dónde falla cada grupo. Me ha ahorrado muchísimo tiempo." />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
