import { useEffect, useState } from "react";
import Layout from "./Layout";
import {
    BookOpen,
    FileText,
    BarChart,
    Users,
    MessageSquare,
} from "lucide-react";

import StudentClassActivities from "@/modules/student/pages/StudentClassActivities";
import StudentClassResults from "@/modules/student/pages/StudentClassResults";
import StudentClassMembers from "@/modules/student/pages/StudentClassMembers";
import StudentClassChat from "@/modules/student/pages/StudentClassChat";

const navItems = [
    { label: "Actividades", value: "activities", icon: FileText },
    { label: "Resultados", value: "results", icon: BarChart },
    { label: "Participantes", value: "members", icon: Users },
    { label: "Chat", value: "chat", icon: MessageSquare },
];

const ClassLayout = ({ className: passedClassName }) => {
    const [selectedSection, setSelectedSection] = useState("activities");

    const [className, setClassName] = useState(() => {
        return passedClassName || localStorage.getItem("selectedClassName") || "Clase";
    });

    useEffect(() => {
        if (className) {
            document.title = className;
        }
    }, [className]);

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "activities":
                return <StudentClassActivities />;
            case "results":
                return <StudentClassResults />;
            case "members":
                return <StudentClassMembers />;
            case "chat":
                return <StudentClassChat />;
            default:
                return null;
        }
    };

    return (
        <Layout isStudent>
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow">
                {/* Título de la clase */}
                <div className="bg-white dark:bg-gray-800 py-4 pl-6 pr-4 md:pl-8 md:pr-6 lg:pl-8 lg:pr-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BookOpen className="text-purple-600 dark:text-purple-400" />
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{className}</h2>
                        </div>
                        <a
                            href="/student/dashboard"
                            className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                        >
                            ← Volver
                        </a>
                    </div>
                </div>

                {/* Contenido y navegación */}
                <div className="flex flex-col md:flex-row-reverse min-h-[500px]">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 p-6 bg-white dark:bg-gray-800">
                        <nav className="flex flex-col gap-3">
                            {navItems.map(({ label, icon: Icon, value }) => {
                                const isActive = selectedSection === value;

                                return (
                                    <button
                                        key={value}
                                        onClick={() => setSelectedSection(value)}
                                        className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition transform duration-200 ease-in-out shadow-sm
                    ${
                                            isActive
                                                ? "bg-purple-600 text-white scale-[1.05] shadow-md"
                                                : "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {label}
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Contenido principal */}
                    <main className="flex-1 p-6 md:p-8 bg-purple-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                            {renderSectionContent()}
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
};

export default ClassLayout;
