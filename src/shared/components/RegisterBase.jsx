import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, School, Hash, Phone, Building2 } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

const RegisterBase = ({ role, redirectTo, loginRoute, rol }) => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    school_name: '',
    school_code: '',
    school_email: '',
    school_tel: '',
    school_type: '',
  });

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
      await register({ ...formData }, role);
      setSuccess('Usuario registrado correctamente');
      navigate(redirectTo);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: err.response?.data?.message || 'Error desconocido' });
      }
    }
  };

  const altRoles = {
    student: [
      { to: '/teacher/register', label: 'Soy profesor' },
      { to: '/director/register', label: 'Soy director' },
    ],
    teacher: [
      { to: '/student/register', label: 'Soy alumno' },
      { to: '/director/register', label: 'Soy director' },
    ],
    director: [
      { to: '/student/register', label: 'Soy alumno' },
      { to: '/teacher/register', label: 'Soy profesor' },
    ],
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-400 to-purple-200 overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-300 opacity-20 blur-3xl"
            style={{
              width: `${50 + Math.random() * 80}px`,
              height: `${50 + Math.random() * 80}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md z-10 mx-4"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Ludus logo" className="w-40 h-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Bienvenido {rol}</h2>
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            icon={<Mail />}
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name}
          />
          <InputField
            icon={<Mail />}
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
          <InputField
            icon={<Lock />}
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
          <InputField
            icon={<Lock />}
            name="password_confirmation"
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            error={errors.password_confirmation}
          />

          {role === 'director' && (
            <>
              <InputField
                icon={<School />}
                name="school_name"
                placeholder="Nombre del centro"
                value={formData.school_name}
                onChange={handleChange}
                required
                error={errors.school_name}
              />
              <InputField
                icon={<Hash />}
                name="school_code"
                placeholder="Código del centro"
                value={formData.school_code}
                onChange={handleChange}
                required
                error={errors.school_code}
              />
              <InputField
                icon={<Mail />}
                name="school_email"
                type="email"
                placeholder="Email del centro"
                value={formData.school_email}
                onChange={handleChange}
                required
                error={errors.school_email}
              />
              <InputField
                icon={<Phone />}
                name="school_tel"
                placeholder="Teléfono del centro"
                value={formData.school_tel}
                onChange={handleChange}
                required
                error={errors.school_tel}
              />
              <SelectField
                icon={<Building2 />}
                name="school_type"
                value={formData.school_type}
                onChange={handleChange}
                error={errors.school_type}
                required
                options={[
                  { value: '', label: 'Selecciona tipo de centro' },
                  { value: 'Público', label: 'Público' },
                  { value: 'Privado', label: 'Privado' },
                ]}
              />
            </>
          )}

          {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.01] shadow-md"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link
            to={loginRoute}
            className="text-purple-600 hover:text-purple-800 font-medium transition"
          >
            Inicia sesión aquí
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

// InputField común
const InputField = ({ icon, error, ...props }) => (
  <div className="relative">
    {icon && <div className="absolute left-3 top-3 text-purple-400">{icon}</div>}
    <input
      {...props}
      className={`w-full ${icon ? 'pl-10' : 'pl-3'} border ${error ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// SelectField para school_type
const SelectField = ({ icon, error, options, ...props }) => (
  <div className="relative">
    {icon && <div className="absolute left-3 top-3 text-purple-400">{icon}</div>}
    <select
      {...props}
      className={`w-full ${icon ? 'pl-10' : 'pl-3'} border ${error ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default RegisterBase;
