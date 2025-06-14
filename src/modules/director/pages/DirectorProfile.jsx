"use client"
import { useState, useEffect } from "react"
import axios from "@/shared/functions/axiosConfig"
import Layout from "../../../shared/components/Layout.jsx"

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
    formData.append('_method', 'PUT');
    formData.append('name', tempName);
    if (selectedImage) {
      formData.append('profile_img', selectedImage);
    }

    try {
      const res = await axios.post('/director/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onSave(res.data.name, res.data.profile_img);
      onClose();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
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

export default function DirectorProfile() {
  const [userName, setUserName] = useState('Cargando...');
  const [profileImage, setProfileImage] = useState('/placeholder.svg');
  const [schoolName, setSchoolName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/director/profile');
        setUserName(res.data.name);
        setProfileImage(
          res.data.profile_img
            ? `http://ludustfg.test/storage/${res.data.profile_img}`
            : '/placeholder.svg'
        );
        setSchoolName(res.data.school_name);
        setTeachers(res.data.teachers);
      } catch (err) {
        console.error('Error al cargar el perfil del director', err);
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center items-center">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="p-8">
            <div className="mb-6">
              <button
                onClick={() => window.history.back()}
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                ← Volver
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group hover:scale-105 transition-transform">
                    <div className="w-36 h-36 rounded-full border-4 border-purple-200 overflow-hidden shadow-md">
                      <img
                        src={profileImage}
                        alt="Foto de perfil"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      onClick={handleEditToggle}
                      className="absolute bottom-1 right-1 bg-white dark:bg-gray-700 p-2 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
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
                  <div className="flex flex-col">
                    <h1 className="text-4xl font-serif text-gray-900 dark:text-white">
                      {userName}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{schoolName}</p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">
                  Profesores asignados
                </h2>
                <ul className="space-y-4">
                  {teachers.map((teacher) => (
                    <li
                      key={teacher.id}
                      className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 border-l-4 border-purple-400 p-4 rounded shadow-sm"
                    >
                      <p className="font-semibold text-gray-800 dark:text-white">{teacher.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {teacher.id} — {teacher.email}
                      </p>
                    </li>
                  ))}
                </ul>
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
