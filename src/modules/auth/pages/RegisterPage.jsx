import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Image } from 'lucide-react';
import logo from '@/shared/assets/images/logo.png';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profile_img: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registrando...', formData);
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-indigo-100 overflow-hidden">

            <div
                className="relative inset-0 -z-10 bg-[repeating-linear-gradient(45deg,_#c084fc33_0px,_#c084fc33_1px,_transparent_1px,_transparent_20px)]">

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


    {/* Formulario */
    }
    <motion.div
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md z-10"
            >
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Ludus logo" className="w-40 h-auto"/>
                </div>
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Crear cuenta</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        icon={<Mail/>}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                        required
                    />
                    <InputField
                        icon={<Mail/>}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />
                    <InputField
                        icon={<Lock/>}
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
                        Registrarse
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const InputField = ({icon, ...props}) => (
    <div className="relative">
        <div className="absolute left-3 top-3 text-purple-400">{icon}</div>
        <input
            {...props}
            className="pl-10 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
    </div>
);

export default RegisterPage;
