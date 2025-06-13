'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ShortAnswerQuestion({ question, answer, onChange }) {
  const [localAnswer, setLocalAnswer] = useState(answer);

  useEffect(() => {
    setLocalAnswer(answer);
  }, [answer]);

  const handleChange = (e) => {
    setLocalAnswer(e.target.value);
  };

  const handleBlur = () => {
    onChange(localAnswer);
  };

  return (
    <div>
      <textarea
        value={localAnswer}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Escribe tu respuesta aquí..."
        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-purple-500 dark:focus:border-purple-400 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 focus:outline-none min-h-[150px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      />

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: localAnswer && localAnswer.length > 0 ? 1 : 0,
          height: localAnswer && localAnswer.length > 0 ? 'auto' : 0,
        }}
        className="mt-2 overflow-hidden"
      >
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Caracteres: {localAnswer ? localAnswer.length : 0}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Palabras: {localAnswer ? localAnswer.trim().split(/\s+/).filter(Boolean).length : 0}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
