'use client';

import { motion } from 'framer-motion';

export default function SingleChoiceQuestion({ question, answer, onChange }) {
  const handleSelect = (optionIndex) => {
    // Si ya está seleccionada, deseleccionarla
    if (answer === optionIndex) {
      onChange(null);
    } else {
      onChange(optionIndex);
    }
  };

  return (
    <div className="space-y-3">
      {question.content.options.map((option, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => handleSelect(index)}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors
            ${
              answer === index
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
        >
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
              ${
                answer === index
                  ? 'border-purple-500 dark:border-purple-400'
                  : 'border-gray-400 dark:border-gray-500'
              }`}
            >
              {answer === index && (
                <div className="w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400" />
              )}
            </div>
            <span className="text-gray-800 dark:text-gray-200">{option}</span>
          </div>
        </motion.div>
      ))}

      {answer !== null && (
        <motion.button
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onClick={() => onChange(null)}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Dejar en blanco
        </motion.button>
      )}
    </div>
  );
}
