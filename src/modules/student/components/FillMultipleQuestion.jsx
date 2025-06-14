'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FillMultipleQuestion({ question, answer, onChange }) {
  const [localAnswers, setLocalAnswers] = useState(answer || {});
  const [parsedContent, setParsedContent] = useState([]);

  // Procesar el texto para identificar los huecos
  useEffect(() => {
    const parts = [];
    const text = question.title;
    const blanks = {};

    // Crear un objeto con los blancos ordenados por número
    Object.entries(question.content).forEach(([key, value]) => {
      blanks[value.number] = {
        id: value.id,
        number: value.number,
        options: value.options || [],
      };
    });

    // Encontrar todos los marcadores [🔲N] y dividir el texto
    let lastIndex = 0;
    let result;

    // Expresión regular para encontrar los marcadores [🔲N]
    const regex = /\[🔲(\d+)\]/g;

    while ((result = regex.exec(text)) !== null) {
      const matchStart = result.index;
      const matchEnd = regex.lastIndex;
      const blankNumber = Number.parseInt(result[1], 10);
      const blankData = Object.entries(blanks).find(
        ([_, value]) => value.number === blankNumber
      )?.[1];

      // Añadir el texto antes del marcador
      if (matchStart > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, matchStart),
        });
      }

      // Añadir el select para el hueco
      if (blankData) {
        parts.push({
          type: 'select',
          blankId: blankData.id,
          blankNumber,
          options: blankData.options,
        });
      }

      lastIndex = matchEnd;
    }

    // Añadir el texto restante después del último marcador
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
      });
    }

    setParsedContent(parts);
  }, [question]);

  useEffect(() => {
    setLocalAnswers(answer || {});
  }, [answer]);

  const handleChange = (blankId, value) => {
    const newAnswers = {
      ...localAnswers,
      [blankId]: value,
    };

    setLocalAnswers(newAnswers);
    onChange(newAnswers);
  };

  const clearAllSelections = () => {
    setLocalAnswers({});
    onChange({});
  };

  return (
    <div>
      <div className="fill-multiple-container text-lg leading-relaxed">
        {parsedContent.map((part, index) => {
          if (part.type === 'text') {
            return <span key={index}>{part.content}</span>;
          } else if (part.type === 'select') {
            return (
              <select
                key={`select-${part.blankId}`}
                value={localAnswers[part.blankId] || ''}
                onChange={(e) => handleChange(part.blankId, e.target.value)}
                className="blank-select"
              >
                <option value="">-- Seleccionar --</option>
                {part.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          }
          return null;
        })}
      </div>

      {Object.keys(localAnswers).length > 0 && (
        <motion.button
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onClick={clearAllSelections}
          className="mt-4 text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Limpiar todas las selecciones
        </motion.button>
      )}

      <style jsx global>{`
        .fill-multiple-container select.blank-select {
          display: inline-block;
          width: auto;
          min-width: 150px;
          padding: 4px 8px;
          margin: 0 4px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          font-size: 0.9em;
          background-color: white;
          color: #1f2937;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 16px;
          padding-right: 32px;
        }

        .dark .fill-multiple-container select.blank-select {
          background-color: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d1d5db' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }

        .fill-multiple-container select.blank-select:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }

        .dark .fill-multiple-container select.blank-select:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
        }
      `}</style>
    </div>
  );
}
