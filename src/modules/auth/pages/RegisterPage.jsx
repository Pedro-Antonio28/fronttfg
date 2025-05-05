import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';
import { register } from '../services/authService';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
            const res = await register(formData); // Este ya inserta en la tabla students
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
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-indigo-100 overflow-hidden">
            {/* Fondo decorativo */}
            <div className="relative inset-0 -z-10 bg-[repeating-linear-gradient(45deg,_#c084fc33_0px,_#c084fc33_1px,_transparent_1px,_transparent_20px)]">
                {[...Array(20)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-purple-300 opacity-30 animate-ping blur-sm"
                        style={{
                            width: `${10 + Math.random() * 20}px`,
                            height: `${10 + Math.random() * 20}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Formulario */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md z-10"
            >
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Ludus logo" className="w-40 h-auto" />
                </div>
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
                    />

                    {errors.general && <p className="text-red-500">{errors.general}</p>}
                    {success && <p className="text-green-600">{success}</p>}

                    <button
                        type="submit"
                        className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Registrarse
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const InputField = ({ icon, error, ...props }) => (
    <div className="relative">
        <div className="absolute left-3 top-3 text-purple-400">{icon}</div>
        <input
            {...props}
            className={`pl-10 w-full border ${
                error ? 'border-red-400' : 'border-gray-300'
            } p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default RegisterPage;
