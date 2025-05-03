import React, { useState } from 'react';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await register(form);
      setSuccess('Usuario registrado correctamente');
    } catch (err) {
      setError('Error al registrar: ' + err.response?.data?.message || 'Desconocido');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <input name="name" placeholder="Nombre" onChange={handleChange} className="border p-2 rounded" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />
      <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} className="border p-2 rounded" />
      <button type="submit" className="bg-purple-600 text-white py-2 rounded">Registrarse</button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default RegisterPage;
