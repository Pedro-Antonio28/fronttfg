'use client';

import { motion } from 'framer-motion';

export default function QuestionNavigator({ questions, currentIndex, answers, onSelectQuestion }) {
  // Función para verificar si una pregunta tiene respuesta con contenido
  const isQuestionAnswered = (questionId) => {
    const answer = answers[questionId];

    // Si no hay respuesta
    if (answer === null || answer === undefined) return false;

    // Para respuestas de texto
    if (typeof answer === 'string') return answer.trim() !== '';

    // Para respuestas de opción múltiple
    if (Array.isArray(answer)) return answer.length > 0;

    // Para respuestas de emparejamiento y rellenar huecos
    if (typeof answer === 'object' && answer !== null) {
      // Si es un objeto vacío
      if (Object.keys(answer).length === 0) return false;

      // Para fill_blank y fill_multiple, verificar que al menos un campo tenga contenido
      const values = Object.values(answer);
      return values.some((val) => (val && typeof val === 'string' ? val.trim() !== '' : true));
    }

    return true;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-medium mb-4">Preguntas</h2>
      <div className="space-y-2">
        {questions.map((question, index) => {
          const isAnswered = isQuestionAnswered(question.id);
          const isCurrent = index === currentIndex;

          return (
            <motion.button
              key={question.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectQuestion(index)}
              className={`w-full text-left p-3 rounded-md flex items-center justify-between
                ${
                  isCurrent
                    ? 'bg-purple-100 dark:bg-purple-900/30 border-l-4 border-purple-600'
                    : isAnswered
                      ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <div className="flex items-center">
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs mr-3
                  ${
                    isCurrent
                      ? 'bg-purple-600 text-white'
                      : isAnswered
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-sm truncate max-w-[150px]">
                  {question.title.length > 25
                    ? question.title.substring(0, 25) + '...'
                    : question.title}
                </span>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                {getQuestionTypeLabel(question.type)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function getQuestionTypeLabel(type) {
  const types = {
    single: 'Opción única',
    multiple: 'Opción múltiple',
    text: 'Texto',
    match: 'Emparejar',
    fill_blank: 'Rellenar huecos',
    fill_multiple: 'Selección en huecos',
  };

  return types[type] || type;
}
