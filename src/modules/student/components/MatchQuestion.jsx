'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function MatchQuestion({ question, answer, onChange }) {
  const [matches, setMatches] = useState(answer || {});
  const [selectedLeft, setSelectedLeft] = useState(null);

  useEffect(() => {
    setMatches(answer || {});
  }, [answer]);

  const handleLeftSelect = (leftItem) => {
    setSelectedLeft(leftItem);
  };

  const handleRightSelect = (rightItem) => {
    if (selectedLeft) {
      // Verificar si este rightItem ya está emparejado
      const existingMatch = Object.entries(matches).find(([_, right]) => right === rightItem);

      // Si existe, eliminar el emparejamiento anterior
      if (existingMatch) {
        const [leftKey] = existingMatch;
        const newMatches = { ...matches };
        delete newMatches[leftKey];
        setMatches(newMatches);
        onChange(newMatches);
      }

      // Crear el nuevo emparejamiento
      const newMatches = {
        ...matches,
        [selectedLeft]: rightItem,
      };

      setMatches(newMatches);
      onChange(newMatches);
      setSelectedLeft(null);
    }
  };

  const handleRemoveMatch = (leftItem) => {
    const newMatches = { ...matches };
    delete newMatches[leftItem];
    setMatches(newMatches);
    onChange(newMatches);
  };

  const clearAllMatches = () => {
    setMatches({});
    onChange({});
    setSelectedLeft(null);
  };

  const isLeftSelected = (leftItem) => selectedLeft === leftItem;
  const isLeftMatched = (leftItem) => leftItem in matches;
  const isRightMatched = (rightItem) => Object.values(matches).includes(rightItem);

  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Haz clic en un elemento de la columna izquierda y luego en uno de la columna derecha para
        emparejarlos
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Columna A</h3>
          {question.content.pairs.map((pair, index) => (
            <motion.div
              key={`left-${index}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLeftSelect(pair.left)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors
                ${
                  isLeftSelected(pair.left)
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : isLeftMatched(pair.left)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200">{pair.left}</span>

                {isLeftMatched(pair.left) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMatch(pair.left);
                    }}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Columna derecha */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Columna B</h3>
          {question.content.pairs.map((pair, index) => (
            <motion.div
              key={`right-${index}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRightSelect(pair.right)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors
                ${
                  isRightMatched(pair.right)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : selectedLeft
                      ? 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                      : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              <span className="text-gray-800 dark:text-gray-200">{pair.right}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visualización de emparejamientos */}
      {Object.keys(matches).length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Emparejamientos</h3>
            <button
              onClick={clearAllMatches}
              className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Eliminar todos
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(matches).map(([left, right], index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"
              >
                <span className="text-gray-800 dark:text-gray-200">{left}</span>
                <ArrowRight className="mx-3 text-green-500" size={16} />
                <span className="text-gray-800 dark:text-gray-200">{right}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
