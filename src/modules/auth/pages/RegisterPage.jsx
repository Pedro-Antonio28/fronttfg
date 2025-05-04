import React, { useState } from 'react';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation:'' });
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
      const res = await register(form);
      setSuccess('Usuario registrado correctamente');
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
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

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

      <div>
        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirmar Contraseña"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        {/* Laravel no genera error específico para password_confirmation si falla, solo para password.confirmed */}
      </div>

      <button type="submit" className="bg-purple-600 text-white py-2 rounded">Registrarse</button>

      {errors.general && <p className="text-red-500">{errors.general}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
};

export default RegisterPage;
