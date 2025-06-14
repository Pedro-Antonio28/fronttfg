'use client';
import { useState, useEffect } from 'react';
import axios from '@/shared/functions/axiosConfig';
import Layout from '../../../shared/components/Layout.jsx';

const ProgressCircle = ({ value, label }) => {
  const porcentaje = Math.min(Math.max(value, 0), 10);
  const circunferencia = 2 * Math.PI * 40;
  const progreso = ((10 - porcentaje) / 10) * circunferencia;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-purple-500"
            strokeWidth="10"
            strokeDasharray={circunferencia}
            strokeDashoffset={progreso}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-medium"
          >
            {value}/10
          </text>
        </svg>
      </div>
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, userName, onSave }) => {
  const [tempName, setTempName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setTempName(userName);
      setSelectedImage(null);
      setPreviewImage(null);
      setErrors({});
    }
  }, [isOpen, userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tempName || tempName.trim() === '') {
      setErrors({ name: ['El campo nombre es obligatorio.'] });
      return;
    }

    const formData = new FormData();
    formData.append('_method', 'PUT'); // <-- esto es clave
    formData.append('name', tempName);
    if (selectedImage) {
      formData.append('profile_img', selectedImage);
    }

    try {
      formData.append('_method', 'PUT');

      const res = await axios.post('/student/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSave(res.data.name, res.data.profile_img);
      onClose();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        console.error('Errores de validación:', err.response.data.errors);
      } else {
        console.error('Error al actualizar perfil', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md pointer-events-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Editar perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Nombre
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Foto de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
            {previewImage && <img src={previewImage} className="w-20 h-20 rounded-full mt-2" />}
            {errors.profile_img && (
              <p className="text-red-500 text-sm mt-1">{errors.profile_img[0]}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function StudentProfile() {
  const [userName, setUserName] = useState('Cargando...');
  const [profileImage, setProfileImage] = useState('/placeholder.svg');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/student/profile');
        setUserName(res.data.name);
        setProfileImage(
          res.data.profile_img
            ? `http://ludustfg.test/storage/${res.data.profile_img}`
            : '/placeholder.svg'
        );
        setCategories(res.data.classes);
      } catch (err) {
        console.error('Error al cargar el perfil del profesor', err);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => setIsEditing(true);

  const handleSaveProfile = (newName, newImagePath) => {
    setUserName(newName);
    if (newImagePath) {
      setProfileImage(`http://ludustfg.test/storage/${newImagePath}`);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center items-center transition-colors duration-300">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300">
          <div className="p-8">
            <div className="mb-6">
              <button
                onClick={() => window.history.back()}
                className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
              >
                ← Volver
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group transition-transform duration-300 hover:scale-105">
                    <div className="w-36 h-36 rounded-full border-4 border-purple-200 overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">
                      {profileImage && !profileImage.includes('placeholder') ? (
                        <img
                          src={profileImage}
                          alt="Foto de perfil"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span role="img" aria-label="avatar">
                          👤
                        </span>
                      )}
                    </div>

                    <button
                      className="absolute bottom-1 right-1 bg-white dark:bg-gray-700 p-2 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      onClick={handleEditToggle}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                    </button>
                  </div>
                  <h1 className="text-4xl font-serif text-gray-900 dark:text-white">{userName}</h1>
                </div>
              </div>

              {/* Right */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
                  Medias por clase
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {categories.map((clase) => (
                    <div className="transition-transform hover:scale-105" key={clase.id}>
                      <ProgressCircle value={clase.average_mark ?? 0} label={clase.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        userName={userName}
        onSave={handleSaveProfile}
      />
    </Layout>
  );
}
