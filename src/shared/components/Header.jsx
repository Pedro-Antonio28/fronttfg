import React from 'react';
import logo from '@/shared/assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="flex justify-between items-center px-8 py-4 shadow">
    <div className="flex items-center gap-3">
      <Link to="/">
        <img src={logo} alt="Ludus logo" className="w-40 h-40 cursor-pointer" />
      </Link>
    </div>
    <nav className="flex gap-6 items-center">
      <a href="#features" className="hover:text-purple-600">Características</a>
      <a href="#testimonials" className="hover:text-purple-600">Opiniones</a>
      <a href="#" className="hover:text-purple-600">Iniciar sesión</a>
      <a href="#" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Registrarse</a>
    </nav>
  </header>
);

export default Header;
