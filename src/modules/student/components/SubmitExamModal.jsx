'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function SubmitExamModal({
  answeredQuestions,
  totalQuestions,
  onCancel,
  onConfirm,
}) {
  const allAnswered = answeredQuestions === totalQuestions;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            {allAnswered ? (
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-center mb-2">
            {allAnswered ? '¿Listo para entregar?' : 'Hay preguntas sin responder'}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            {allAnswered
              ? 'Has respondido todas las preguntas. Una vez entregado, no podrás modificar tus respuestas.'
              : `Has respondido ${answeredQuestions} de ${totalQuestions} preguntas. Las preguntas sin responder se considerarán en blanco. ¿Deseas entregar de todas formas?`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Volver al examen
            </button>

            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-md text-white
                ${allAnswered ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'}`}
            >
              {allAnswered ? 'Entregar examen' : 'Entregar con preguntas en blanco'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
