import React from 'react';
import logo from '@/shared/assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="flex items-center justify-between px-4 py-4 bg-purple-900 shadow-md">
        {/* Logo */}
        <div className="flex items-center h-10 w-32 overflow-hidden">
            <img src={logo} alt="Logo" className="h-full object-contain scale-350 transform translate-x-8" />
        </div>

        {/* Botones */}
        <div className="flex items-center gap-4">
            <button className="text-black border border-black px-4 py-1 bg-[#8c73ef] rounded hover:scale-105">
                BANDEJA
            </button>
            <button className="text-black border border-black px-4 py-1 bg-[#8c73ef] rounded hover:scale-105">
                UNIRTE
            </button>
            {/* Circulo o avatar */}
            <div className="w-8 h-8 rounded-full border border-black ml-4 hover:scale-105"></div>
        </div>
    </header>
);

export default Header;
