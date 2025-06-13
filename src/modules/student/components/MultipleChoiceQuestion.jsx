'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function MultipleChoiceQuestion({ question, answer, onChange }) {
  const handleToggle = (optionIndex) => {
    const newAnswer = [...answer];

    if (newAnswer.includes(optionIndex)) {
      // Remove if already selected
      onChange(newAnswer.filter((idx) => idx !== optionIndex));
    } else {
      // Add if not selected
      onChange([...newAnswer, optionIndex]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Selecciona todas las opciones que consideres correctas
      </p>

      {question.content.options.map((option, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => handleToggle(index)}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors
            ${
              answer.includes(index)
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
        >
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center
              ${
                answer.includes(index)
                  ? 'border-purple-500 bg-purple-500 dark:border-purple-400 dark:bg-purple-400'
                  : 'border-gray-400 dark:border-gray-500'
              }`}
            >
              {answer.includes(index) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-gray-800 dark:text-gray-200">{option}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
