import { motion } from 'framer-motion';
import { BookOpen, ClipboardList, Award } from 'lucide-react';
import Layout from "../../../shared/components/Layout.jsx";

const TeacherProfile = () => {
    // Datos de ejemplo del profesor
    const teacherData = {
        name: "Antonio",
        examsCreated: 12,
        examsList: [
            "Examen de Historia - Tema 3",
            "Examen de Matemáticas - Ecuaciones",
            "Examen de Lengua - Sintaxis",
            "Examen de Ciencias - El cuerpo humano",
        ],
        categories: [
            { name: "Categoría 1", score: 8 },
            { name: "Categoría 2", score: 5 },
            { name: "Categoría 3", score: 7 },
            { name: "Categoría 4", score: 5 },
        ],
    }

    return (
        <Layout isTeacher={true}>
        <div className="w-[98%] h-auto max-h-[calc(100vh-20px)] mx-auto my-2">
            {/* Header con logo y botones */}
            <div className="flex justify-between items-center mb-2 px-2">
                <div className="text-lg font-bold text-purple-800">LOGO</div>
                <div className="flex items-center gap-3">
                    <button className="border border-purple-300 rounded-md px-3 py-1 text-sm text-purple-800">BANDERA</button>
                    <button className="border border-purple-300 rounded-md px-3 py-1 text-sm text-purple-800 flex items-center">
                        ALMACÉN
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                        </svg>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-purple-100"></div>
                </div>
            </div>

            {/* Tarjeta principal del perfil */}
            <div className="w-full bg-white border border-purple-300 rounded-lg shadow-md p-4 relative">
                {/* Edit Button */}
                <button className="absolute right-3 top-3 text-purple-600 hover:text-purple-800 hover:bg-purple-100 p-1.5 rounded-full transition-colors z-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Columna izquierda (2/3 del ancho) para perfil y exámenes */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        {/* Profile Section - Centrado pero ligeramente a la izquierda */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pl-8 pr-4 py-3">
                            <div className="h-24 w-24 rounded-full border-2 border-purple-300 overflow-hidden">
                                <img
                                    src="/placeholder.svg?height=96&width=96"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src =
                                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E"
                                    }}
                                />
                            </div>

                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-bold mb-1 text-purple-900">{teacherData.name}</h1>
                                <div className="text-sm text-gray-600">{teacherData.examsCreated} exámenes creados</div>
                            </div>
                        </div>

                        {/* Exams Section - Debajo del perfil */}
                        <div className="flex flex-col px-4">
                            <div className="space-y-2 max-h-[300px] overflow-auto pr-1">
                                {teacherData.examsList.map((exam, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border border-gray-200 rounded-md hover:border-purple-300 transition-colors"
                                    >
                                        {exam}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-3 border border-purple-500 text-purple-600 hover:bg-purple-100 py-1.5 rounded-md transition-colors text-sm">
                                Ver todos
                            </button>
                        </div>
                    </div>

                    {/* Columna derecha (1/3 del ancho) para categorías */}
                    <div className="md:col-span-1 flex flex-col border-l border-purple-200 pl-4">
                        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-auto pr-1">
                            {teacherData.categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="p-3 bg-white border border-purple-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                                >
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    </div>
                                    <span className="text-xs text-gray-600">{category.name}</span>
                                    <span className="text-sm font-bold text-purple-600">{category.score}/10</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default TeacherProfile
