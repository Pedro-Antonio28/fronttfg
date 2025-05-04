import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logo from '../../shared/assets/images/logo.png'; // Asegúrate de que la ruta sea correcta

const Header = ({ isDirector, isTeacher, isStudent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = isDirector || isTeacher || isStudent;

  // Configuración por rol
  const roleConfig = {
    director: {
      buttons: [
        { name: "Bandeja", href: "/inbox" },
        { name: "Almacén", href: "/storage" }
      ]
    },
    teacher: {
      buttons: [
        { name: "Bandeja", href: "/inbox" },
        { name: "Almacén", href: "/storage" },
        { name: "Nueva Clase", href: "/new-classroom" }
      ]
    },
    student: {
      buttons: [
        { name: "Bandeja", href: "/inbox" },
        { name: "Unirse a Clase", href: "/join-classroom" }
      ]
    },
    guest: {
      buttons: [
        { name: "Iniciar Sesión", href: "/login" },
        { name: "Registrarse", href: "/register" }
      ]
    }
  };

  const getRoleConfig = () => {
    if (isDirector) return roleConfig.director;
    if (isTeacher) return roleConfig.teacher;
    if (isStudent) return roleConfig.student;
    return roleConfig.guest;
  };

  const { buttons } = getRoleConfig();

  return (
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <div className="flex justify-between items-center h-16">
            {/* Logo con imagen */}
            <div className="flex items-center">
              <motion.div
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.5}}
                  className="flex-shrink-0"
              >
                <a href="#" className="flex items-center">
                  <img
                      src={logo}
                      alt="Logo LUDUS"
                      className="h-50 w-auto " // Ajusta la altura según necesites
                  />
                </a>
              </motion.div>
            </div>

            {/* Contenedor derecho */}
            <div className="flex items-center space-x-4">
              <ThemeToggle/>

              {/* Botones - Versión desktop */}
              <div className="hidden md:flex items-center space-x-2">
                {buttons.map((button, index) => (
                    <a
                        key={index}
                        href={button.href}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            isLoggedIn
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : index === buttons.length - 1
                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                        }`}
                    >
                      {button.name}
                    </a>
                ))}
              </div>

              {/* Avatar (solo para usuarios logueados) */}
              {isLoggedIn && (
                  <div className="hidden md:block ml-2">
                    <div
                        className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium">

                    </div>
                  </div>
              )}

              {/* Menú móvil (trigger) */}
              <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                >
                  {isOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isOpen && (
            <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: "auto"}}
                exit={{opacity: 0, height: 0}}
                transition={{duration: 0.3}}
                className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {isLoggedIn && (
                    <div className="flex justify-center py-2">
                      <div
                          className="h-12 w-12 rounded-full flex items-center justify-center text-white text-xl font-medium mb-2">

                      </div>
                    </div>
                )}

                <div className="pt-2 pb-3">
                  <ThemeToggle />
                  {buttons.map((button, index) => (
                      <a
                          key={index}
                          href={button.href}
                          className={`block px-3 py-2 rounded-md text-base font-medium mt-2 ${
                              isLoggedIn
                                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                                  : index === buttons.length - 1
                                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                          }`}
                      >
                        {button.name}
                      </a>
                  ))}
                </div>
              </div>
            </motion.div>
        )}
      </header>
  );
};

export default Header;