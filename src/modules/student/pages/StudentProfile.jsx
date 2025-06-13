import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://ludustfg.test/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setProfile(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500 text-center">
                Error: {error}
                <button
                    onClick={() => window.location.reload()}
                    className="ml-4 px-4 py-2 bg-purple-600 text-white rounded"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-4 text-center">
                No se encontraron datos del perfil
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Contenido del perfil igual al anterior */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Encabezado */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white">
                    <h1 className="text-3xl font-bold">Mi Perfil</h1>
                    <p className="mt-2 opacity-90">
                        {profile.user.email} • Estudiante
                    </p>
                </div>

                {/* Resto del contenido... */}
            </div>
        </div>
    );
};

export default ProfilePage;