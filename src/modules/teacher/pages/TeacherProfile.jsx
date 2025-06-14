"use client"

import { useState } from "react"
import Layout from "../../../shared/components/Layout.jsx";
import ThemeToggle from "../../../shared/components/ThemeToggle.jsx";


// Componente para los círculos de progreso
const ProgressCircle = ({ value, label }) => (
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
                    strokeDasharray="251.2"
                    strokeDashoffset="50.24"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                />
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xl font-medium">
                    {value}/10
                </text>
            </svg>
        </div>
        <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
)

// Componente para el modal de edición
const EditModal = ({isOpen, onClose, userName, onSave}) => {
    const [tempName, setTempName] = useState(userName)
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleNameChange = (e) => {
        setTempName(e.target.value)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(tempName, selectedImage)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl z-10">
                <h2 className="text-xl font-bold mb-4">Editar perfil</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Foto de perfil</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                                {previewImage ? (
                                    <img src={previewImage || "/placeholder.svg"} alt="Preview"
                                         className="w-full h-full object-cover"/>
                                ) : (
                                    <img src="/placeholder.svg?height=80&width=80" alt="Current"
                                         className="w-full h-full object-cover"/>
                                )}
                            </div>
                            <label
                                className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                Cambiar foto
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange}/>
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={tempName}
                            onChange={handleNameChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function TeacherProfile() {
    const [userName, setUserName] = useState("Profesor Garcia ")
    const [profileImage, setProfileImage] = useState("/placeholder.svg?height=128&width=128")
    const [isEditing, setIsEditing] = useState(false)

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    const handleSaveProfile = (newName, newImage) => {
        setUserName(newName)
        if (newImage) {
            setProfileImage(URL.createObjectURL(newImage))
        }
    }

    // Datos de categorías
    const categories = [
        { label: "2ºDAW", value: 9 },
        { label: "1ºASIR", value: 2 },
        { label: "2ºDAM", value: 7 },
        { label: "1ºSMR", value: 5 },
    ]

    // Datos de exámenes
    const exams = [
        { name: "Historia", score: 5 },
        { name: "Matemáticas", score: 5 },
        { name: "Lengua", score: 5 },
    ]

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center">
                <div className="w-full max-w-5xl bg-white rounded-lg border border-gray-200 shadow-md">

                    {/* Content */}
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Left column */}
                            <div className="flex-1">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative">
                                        <div className="w-36 h-36 rounded-full border-4 border-gray-200 overflow-hidden relative">
                                            <img
                                                src={profileImage || "/placeholder.svg"}
                                                alt="Foto de perfil"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <button
                                            className="absolute bottom-1 right-1 bg-white p-2 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
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
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <h1 className="text-4xl font-serif">{userName}</h1>
                                </div>

                                <div className="space-y-6">


                                    <div>
                                        <h3 className="text-lg font-medium">Exámenes creados</h3>
                                        <ul className="mt-3 space-y-2 text-gray-700">
                                            {exams.map((exam, index) => (
                                                <li key={index} className="pl-2 border-l-2 border-purple-300">
                                                    Examen 1 {exam.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button className="w-full py-3 bg-white border-2 border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors">
                                        Ver Todos los exámenes
                                    </button>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="flex-1">
                                <div className="grid grid-cols-2 gap-6">
                                    {categories.map((category, index) => (
                                        <ProgressCircle key={index} value={category.value} label={category.label} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal de edición */}
                {isEditing && (
                    <EditModal isOpen={true} onClose={handleEditToggle} userName={userName} onSave={handleSaveProfile} />
                )}
            </div>
        </Layout>
    )
}