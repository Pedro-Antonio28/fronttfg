import React, { useState } from 'react';
import { login } from '../services/authService';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await login(form);
      setSuccess('Inicio de sesión exitoso');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: err.response?.data?.message || 'Error desconocido' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <div>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 rounded">Iniciar sesión</button>

      {errors.general && <p className="text-red-500">{errors.general}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
};

export default LoginPage;
