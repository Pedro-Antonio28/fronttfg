import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 3000); // Redirige al home después de 3 segundos

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-10 rounded-xl shadow-xl text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">¡Inicio de sesión con Google exitoso! 🎉</h1>
                <p className="text-gray-600">Serás redirigido en unos segundos...</p>
            </div>
        </div>
    );
};

export default GoogleSuccessPage;
