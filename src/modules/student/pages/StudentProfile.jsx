import { motion } from 'framer-motion';
import { BookOpen, ClipboardList, Award } from 'lucide-react';
import Layout from "../../../shared/components/Layout.jsx";

const StudentProfile = () => {
    const studentData = {
        name: "Alberto",
        averageScore: 7,
        exams: [
            { name: "Examen 1 Historia", score: 7 },
            { name: "Examen 1 Matemáticas", score: 2 },
            { name: "Examen 1 Lengua", score: 10 },
        ],
        categories: [
            { name: "Categoría 1", score: 8 },
            { name: "Categoría 2", score: 5 },
            { name: "Categoría 3", score: 7 },
            { name: "Categoría 4", score: 6 },
            { name: "Categoría 1", score: 8 },
            { name: "Categoría 2", score: 5 },
            { name: "Categoría 3", score: 7 },
            { name: "Categoría 4", score: 6 },
        ],
    }

    return (
        <Layout isStudent={true}>
            <div className="w-[98%] h-auto max-h-[calc(100vh-20px)] mx-auto my-2">
                <div className="w-full h-full bg-white border border-purple-300 rounded-lg shadow-md p-4 relative">
                    {/* Edit Button */}
                    <button
                        className="absolute right-3 top-3 text-purple-600 hover:text-purple-800 hover:bg-purple-100 p-1.5 rounded-full transition-colors z-10">
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
                            <div
                                className="flex flex-col sm:flex-row items-center gap-4 pl-8 pr-4 py-3 border-b border-purple-200">
                                <div className="h-20 w-20 rounded-full border-3 border-purple-500 overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=80&width=80"
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src =
                                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E"
                                        }}
                                    />
                                </div>

                                <div className="text-center sm:text-left">
                                    <h1 className="text-xl font-bold mb-1 text-purple-900">{studentData.name}</h1>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-medium text-gray-700">Nota media</span>
                                        <span
                                            className="text-lg font-bold text-purple-600">{studentData.averageScore}/10</span>
                                    </div>
                                </div>
                            </div>

                            {/* Exams Section - Debajo del perfil */}
                            <div className="flex flex-col px-4">
                                <h2 className="text-base font-semibold border-b border-purple-300 pb-1 mb-2 text-purple-800">
                                    Últimos exámenes
                                </h2>

                                <div className="space-y-2 h-[calc(100vh-250px)] max-h-[300px] overflow-auto pr-1">
                                    {studentData.exams.map((exam, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-700 text-sm">{exam.name}</span>
                                                <span
                                                    className="font-bold text-purple-600 text-sm">{exam.score}/10</span>
                                            </div>
                                            <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-purple-500 transition-all"
                                                    style={{width: `${exam.score * 10}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="w-full mt-2 border border-purple-500 text-purple-600 hover:bg-purple-100 py-1.5 rounded-md transition-colors text-sm">
                                    Ver todos los exámenes
                                </button>
                            </div>
                        </div>

                        {/* Columna derecha (1/3 del ancho) para categorías */}
                        <div className="md:col-span-1 flex flex-col border-l border-purple-200 pl-4">
                            <h2 className="text-base font-semibold border-b border-purple-300 pb-1 mb-2 text-purple-800">Categorías</h2>

                            <div
                                className="grid grid-cols-2 gap-2 h-[calc(100vh-250px)] max-h-[300px] overflow-auto pr-1">
                                {studentData.categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="p-2 bg-white border border-purple-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                                    >
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
    );
};

export default StudentProfile
