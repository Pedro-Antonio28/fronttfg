'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FillBlankQuestion({ question, answer, onChange }) {
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
      const blankId = Object.entries(blanks).find(([_, value]) => value.number === blankNumber)?.[1]
        ?.id;

      // Añadir el texto antes del marcador
      if (matchStart > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, matchStart),
        });
      }

      // Añadir el input para el hueco
      if (blankId) {
        parts.push({
          type: 'input',
          blankId,
          blankNumber,
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

  const clearAllBlanks = () => {
    setLocalAnswers({});
    onChange({});
  };

  return (
    <div>
      <div className="fill-blank-container text-lg leading-relaxed">
        {parsedContent.map((part, index) => {
          if (part.type === 'text') {
            return <span key={index}>{part.content}</span>;
          } else if (part.type === 'input') {
            return (
              <input
                key={`input-${part.blankId}`}
                type="text"
                value={localAnswers[part.blankId] || ''}
                onChange={(e) => handleChange(part.blankId, e.target.value)}
                placeholder={`Respuesta ${part.blankNumber}`}
                className="blank-input"
              />
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
          onClick={clearAllBlanks}
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
          Limpiar todos los campos
        </motion.button>
      )}

      <style jsx global>{`
        .fill-blank-container input.blank-input {
          display: inline-block;
          width: 150px;
          padding: 4px 8px;
          margin: 0 4px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          font-size: 0.9em;
          background-color: white;
          color: #1f2937;
        }

        .dark .fill-blank-container input.blank-input {
          background-color: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
        }

        .fill-blank-container input.blank-input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }

        .dark .fill-blank-container input.blank-input:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
        }
      `}</style>
    </div>
  );
}
