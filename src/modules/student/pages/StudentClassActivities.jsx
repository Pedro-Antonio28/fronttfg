import { useEffect, useState } from "react";
import axios from "@/shared/functions/axiosConfig";
import ClassLayout from "@/shared/components/ClassLayout";
import Calendar from "../../../shared/components/Calendar";

const StudentClassActivities = () => {
    const [classId, setClassId] = useState(null);
    const [className, setClassName] = useState("Clase");
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("classId");
        setClassId(id);
    }, []);

    useEffect(() => {
        if (!classId) return;

        const fetchClass = async () => {
            try {
                const { data } = await axios.get(`/student/classes/${classId}`);
                setClassName(data.data.class_name || `Clase ${classId}`);
                document.title = data.data.class_name || `Clase ${classId}`;
            } catch (error) {
                console.error("No se pudo cargar la clase:", error);
            }
        };

        const fetchTests = async () => {
            try {
                const { data } = await axios.get(`/student/classes/${classId}/tests`);
                setTests(data);
            } catch (error) {
                console.error("No se pudieron cargar los exámenes:", error);
            }
        };

        fetchClass();
        fetchTests();
    }, [classId]);

    const examDates = tests.map((t) => t.exam_date);

    return (
        <ClassLayout>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Próximos exámenes</h2>
                    {tests.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-300">
                            No hay exámenes programados.
                        </p>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead>
                            <tr className="text-gray-600 dark:text-gray-300">
                                <th className="py-2">Título</th>
                                <th className="py-2">Fecha</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tests.map((test) => (
                                <tr
                                    key={test.id}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                >
                                    <td className="py-2 text-gray-800 dark:text-gray-100">
                                        {test.title}
                                    </td>
                                    <td className="py-2 text-gray-800 dark:text-gray-100">
                                        {test.exam_date}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <Calendar
                    examDates={tests.map(t => ({
                        date: t.exam_date,
                        title: t.title
                    }))}
                />

            </div>
        </ClassLayout>
    );
};

export default StudentClassActivities;
