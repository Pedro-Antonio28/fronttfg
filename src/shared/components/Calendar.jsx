import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ examDates }) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const formatDay = (y, m, d) => new Date(y, m, d).toISOString().split("T")[0];
    const getStartDay = (y, m) => {
        const day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1; // lunes como inicio
    };

    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDay(year, month);

    const goToPreviousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
        } else {
            setMonth((prev) => prev - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow w-full md:w-1/3">
            <div className="flex items-center justify-between mb-4">
                <button onClick={goToPreviousMonth}>
                    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {monthNames[month]} {year}
                </h3>
                <button onClick={goToNextMonth}>
                    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                    <div key={d} className="font-semibold">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center text-sm gap-y-1">
                {[...Array(startDay)].map((_, i) => <div key={`empty-${i}`} />)}
                {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const dateStr = formatDay(year, month, day);
                    const isExam = examDates.includes(dateStr);

                    return (
                        <div
                            key={day}
                            className={`p-1 rounded-full ${
                                isExam
                                    ? "bg-purple-600 text-white font-bold"
                                    : "text-gray-800 dark:text-gray-100"
                            }`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
