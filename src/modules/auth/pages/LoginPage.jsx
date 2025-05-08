import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';
import { login } from '../services/authService';
import {Link, useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const res = await login(formData); // 👈 llama al login del estudiante
            setSuccess('Inicio de sesión exitoso');
            navigate('/students/dashboard');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors || {});
            } else {
                setErrors({ general: err.response?.data?.message || 'Error desconocido' });
            }
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-400 to-purple-200 overflow-hidden">
            <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-300 opacity-20 blur-3xl"></div>
                <div
                    className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-pink-400 opacity-10 blur-2xl"></div>
                <div
                    className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-indigo-400 opacity-15 blur-3xl"></div>
                <div
                    className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-300 opacity-10 blur-2xl"></div>
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-purple-300 opacity-20 blur-3xl"></div>
                <div
                    className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-pink-400 opacity-10 blur-2xl"></div>
                <div
                    className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-indigo-400 opacity-15 blur-3xl"></div>
                <div
                    className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-300 opacity-10 blur-2xl"></div>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md z-2">
                <div className="flex justify-center mb-6 -mt-12">
                    <img src={logo} alt="Ludus logo" className="w-50 h-auto"/>
                </div>
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Iniciar sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        icon={<Mail/>}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                        error={errors.email}
                    />
                    <InputField
                        icon={<Lock/>}
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
                        to="/register"
                        className="text-purple-600 hover:text-purple-800 font-medium transition"
                    >
                        Registrate aquí
                    </Link>
                </div>
            </div>
        </div>

    );
};


const InputField = ({icon, error, ...props}) => (
    <div className="relative">
        <div className="absolute left-3 top-3 text-purple-400">{icon}</div>
        <input
            {...props}
            className={`pl-10 w-full border ${error ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default LoginPage;
