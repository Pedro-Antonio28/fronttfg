import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
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
            await register(formData, 'student');
            setSuccess('Usuario registrado correctamente');
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
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-400 to-purple-200 overflow-hidden">
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
            <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_#c084fc10_0%,_transparent_70%)]">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-purple-300 opacity-20"
                        initial={{
                            width: `${10 + Math.random() * 20}px`,
                            height: `${10 + Math.random() * 20}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() > 0.5 ? 20 : -20],
                            x: [0, Math.random() > 0.5 ? 20 : -20],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                ))}
            </div>

            {/* Formulario */}
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md z-10 mx-4"
            >

                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Crear cuenta</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        icon={<Mail/>}
                        name="name"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        error={errors.name}
                    />
                    <InputField
                        icon={<Mail/>}
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        error={errors.email}
                    />
                    <InputField
                        icon={<Lock/>}
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        error={errors.password}
                    />
                    <InputField
                        icon={<Lock/>}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                        error={errors.password_confirmation}
                    />

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
                        to="/login"
                        className="text-purple-600 hover:text-purple-800 font-medium transition"
                    >
                        Inicia sesión aquí
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

const InputField = ({icon, error, ...props}) => (
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