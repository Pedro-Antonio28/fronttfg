import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Iniciando sesión...', formData);
  };

  return (
      <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">

        {/* ✅ Fondo decorativo con líneas diagonales moradas */}
        <div className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(135deg,_#c084fc_0px,_#c084fc_2px,_transparent_2px,_transparent_20px)] opacity-20"></div>

        {/* 🎯 Formulario */}
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md z-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Ludus logo" className="w-40 h-auto" />
          </div>
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
                icon={<Mail />}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
            />
            <InputField
                icon={<Lock />}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
            />

            <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
  );
};

const InputField = ({ icon, ...props }) => (
    <div className="relative">
      <div className="absolute left-3 top-3 text-purple-400">{icon}</div>
      <input
          {...props}
          className="pl-10 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
    </div>
);

export default LoginPage;
