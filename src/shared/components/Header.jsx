import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logo from '../../shared/assets/images/logo.png'; // Asegúrate de que la ruta sea correcta
import logo_blanco from '../../shared/assets/images/logo_blanco.png'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Header = ({ isDirector, isTeacher, isStudent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const role = user?.role;

  // Configuración por rol
  const roleConfig = {
    director: [
      { name: 'Bandeja', href: '/inbox' },
      { name: 'Almacén', href: '/storage' },
    ],
    teacher: [
      { name: 'Bandeja', href: '/inbox' },
      { name: 'Almacén', href: '/teacher/storage-bank' },
      { name: 'Nueva Clase', href: '/new-classroom' },
    ],
    student: [
      { name: 'Bandeja', href: '/inbox' },
      { name: 'Unirse a Clase', href: '/student/join-class' },
    ],
    guest: [
      { name: 'Soy Profesor', href: '/teacher/login' },
      { name: 'Soy Director', href: '/director/login' },
      { name: 'Soy Alumno', href: '/student/login' },
    ],
  };

  const buttons = roleConfig[role] || roleConfig.guest;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo con imagen */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <>
                  {/* Logo para modo claro */}
                  <img
                    src={logo}
                    alt="Logo LUDUS claro"
                    className="h-50 w-auto block dark:hidden"
                  />
                  {/* Logo para modo oscuro */}
                  <img
                    src={logo_blanco}
                    alt="Logo LUDUS oscuro"
                    className="h-50 w-auto hidden dark:block"
                  />
                </>
              </Link>
            </div>
          </div>

          {/* Contenedor derecho */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

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
              <div className="relative hidden md:block ml-2">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium focus:outline-none"
                >
                  👤
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-50">
                    <a
                        href={`/${role}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Mi perfil
                    </a>
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Menú móvil (trigger) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="pt-2 pb-3">
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
            {isLoggedIn && (
              <>
                <a
                    href={`/${role}/profile`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Mi perfil
                </a>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
