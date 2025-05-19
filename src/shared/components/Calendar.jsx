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
        return day === 0 ? 6 : day - 1;
    };

    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDay(year, month);

    const goToPreviousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(prev => prev - 1);
        } else {
            setMonth(prev => prev - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(prev => prev + 1);
        } else {
            setMonth(prev => prev + 1);
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
                    const exam = examDates.find(e => e.date === dateStr);

                    return (
                        <div key={day} className="relative group">
                            <div
                                className={`p-1 rounded-full transition-all duration-200 ${
                                    exam
                                        ? "bg-purple-600 text-white font-bold hover:scale-105"
                                        : "text-gray-800 dark:text-gray-100"
                                }`}
                            >
                                {day}
                            </div>

                            {exam && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max max-w-[160px] px-2 py-1 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-200 bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                                    {exam.title}
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
