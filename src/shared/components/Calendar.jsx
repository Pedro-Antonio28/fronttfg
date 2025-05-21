import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const Calendar = ({ examDates }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const formatDay = (y, m, d) =>
        `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const getStartDay = (y, m) => {
        const day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const isToday = (dateStr) => {
        const now = new Date();
        const localToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        return dateStr === localToday;
    };

    const daysUntil = (targetDate) => {
        const today = new Date();
        const examDate = new Date(targetDate);
        return Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
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
        <div className="relative z-0">
            {/* Fondo decorativo animado */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-100/30 to-indigo-200/30 blur-2xl animate-pulse rounded-xl"></div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow min-w-[280px] max-w-[340px] w-full relative z-10">
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

                        let ringColor = "";
                        if (exam) {
                            const urgency = daysUntil(dateStr);
                            if (urgency <= 1) ringColor = "ring-red-500";
                            else if (urgency <= 5) ringColor = "ring-yellow-400";
                            else ringColor = "ring-green-500";
                        }

                        return (
                            <motion.div
                                key={day}
                                whileHover={exam ? {scale: 1.15, rotate: [0, 1, -1, 0]} : {}}
                                transition={{duration: 0.4}}
                                className="relative group"
                            >
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto transition-all duration-200 cursor-default relative
                                ${
                                        exam
                                            ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold shadow-md"
                                            : isToday(dateStr)
                                                ? "bg-purple-100 dark:bg-purple-700/40 text-purple-700 dark:text-white font-semibold"
                                                : "text-gray-400 dark:text-gray-500"
                                    }
                                                    ${exam ? `ring-2 ${ringColor}` : ""}
                                        `}
                                >
                                    {day}
                                    {isToday(dateStr) && !exam && (
                                        <span
                                            className="absolute -top-1.5 -right-1.5 bg-purple-500 text-white text-[10px] px-1 rounded-full shadow">
                                    Hoy
                                </span>
                                    )}
                                </div>


                                {exam && (
                                    <motion.div
                                        initial={{opacity: 0, y: 5}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3}}
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-max max-w-[160px] px-3 py-1 text-xs rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-200 bg-white/90 dark:bg-gray-900/80 backdrop-blur text-gray-800 dark:text-white"
                                    >
                                        {exam.title}
                                    </motion.div>

                                )}
                            </motion.div>

                        );
                    })}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
