'use client';

import { ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExamHeader({ title, timeRemaining, onSubmit }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a
              href="/dashboard"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="sr-only">Volver</span>
            </a>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full"
              animate={{
                backgroundColor:
                  timeRemaining.startsWith('05:') ||
                  timeRemaining.startsWith('04:') ||
                  timeRemaining.startsWith('03:') ||
                  timeRemaining.startsWith('02:') ||
                  timeRemaining.startsWith('01:') ||
                  timeRemaining.startsWith('00:')
                    ? ['#fee2e2', '#fef2f2', '#fee2e2']
                    : undefined,
              }}
              transition={{
                duration: 1,
                repeat:
                  timeRemaining.startsWith('05:') ||
                  timeRemaining.startsWith('04:') ||
                  timeRemaining.startsWith('03:') ||
                  timeRemaining.startsWith('02:') ||
                  timeRemaining.startsWith('01:') ||
                  timeRemaining.startsWith('00:')
                    ? Number.POSITIVE_INFINITY
                    : 0,
              }}
            >
              <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {timeRemaining}
              </span>
            </motion.div>

            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium"
            >
              Entregar examen
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
