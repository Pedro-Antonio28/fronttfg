import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';
import { motion } from 'framer-motion';
import { useAuth } from '@/shared/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginBase = ({ role, redirectTo, registerLink, rol }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    try {
      await login(formData, role);
      setSuccess('Inicio de sesión exitoso');
      navigate(redirectTo);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: err.response?.data?.message || 'Error desconocido' });
      }
    }
  };

  // Links de cambio de rol (no mostrar el actual)
  const altRoles = {
    student: [
      { to: '/teacher/login', label: 'Soy profesor' },
      { to: '/director/login', label: 'Soy director' },
    ],
    teacher: [
      { to: '/student/login', label: 'Soy alumno' },
      { to: '/director/login', label: 'Soy director' },
    ],
    director: [
      { to: '/student/login', label: 'Soy alumno' },
      { to: '/teacher/login', label: 'Soy profesor' },
    ],
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-400 to-purple-200 overflow-hidden">
      {/* Fondo decorativo */}
      <BackgroundDecor />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-8 w-full max-w-md z-10 mx-4"
      >
        <div className="flex justify-center mb-6 -mt-12">
          <img src={logo} alt="Ludus logo" className="w-40 h-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Bienvenido {rol}</h2>
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
            error={errors.email}
          />
          <InputField
            icon={<Lock />}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            error={errors.password}
          />
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link
            to={registerLink}
            className="text-purple-600 hover:text-purple-800 font-medium transition"
          >
            Regístrate aquí
          </Link>
        </div>

        <div className="mt-4 text-center flex flex-row justify-around text-sm text-gray-600 space-y-1">
          {altRoles[role]?.map((r) => (
            <div key={r.to}>
              <Link
                to={r.to}
                className="text-purple-600 hover:text-purple-800 font-medium transition"
              >
                {r.label}
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({ icon, error, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-3 text-purple-400">{icon}</div>
    <input
      {...props}
      className={`pl-10 w-full border ${error ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const BackgroundDecor = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className={`absolute rounded-full blur-3xl`}
        style={{
          backgroundColor: i % 2 === 0 ? '#c084fc' : '#818cf8',
          width: `${100 + Math.random() * 100}px`,
          height: `${100 + Math.random() * 100}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.15,
        }}
      />
    ))}
  </div>
);

export default LoginBase;
