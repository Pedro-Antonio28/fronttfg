'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExamHeader from '../components/ExamHeader';
import QuestionNavigator from '../components/QuestionNavigator';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import ShortAnswerQuestion from '../components/ShortAnswerQuestion';
import FillBlankQuestion from '../components/FillBlankQuestion';
import FillMultipleQuestion from '../components/FillMultipleQuestion';
import MatchQuestion from '../components/MatchQuestion';
import ProgressBar from '../components/ProgressBar';
import SubmitExamModal from '../components/SubmitExamModal';
import Layout from '../../../shared/components/Layout';

export default function ExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutos por defecto

  // Simulación de carga de datos del examen
  useEffect(() => {
    // En un caso real, aquí harías la petición a la API
    const mockExamData = {
      id: 1,
      title: 'Examen de Conocimientos Generales',
      duration: 3600, // 60 minutos en segundos
      questions: [
        {
          id: 1,
          title: '¿Cuál es la capital de Francia?',
          type: 'single',
          content: {
            options: ['Londres', 'París', 'Madrid', 'Berlín'],
            correct_option: 1,
          },
        },
        {
          id: 2,
          title: 'Selecciona los lenguajes de programación',
          type: 'multiple',
          content: {
            options: ['HTML', 'Python', 'JavaScript', 'CSS'],
            correct_options: [1, 2],
          },
        },
        {
          id: 3,
          title: 'Explica el proceso de fotosíntesis',
          type: 'text',
          content: {},
        },
        {
          id: 4,
          title: 'Relaciona los países con sus capitales',
          type: 'match',
          content: {
            pairs: [
              { left: 'España', right: 'Madrid' },
              { left: 'Italia', right: 'Roma' },
            ],
          },
        },
        {
          id: 5,
          title: 'El [🔲1] es el satélite de la Tierra. Y su proclamador se llamaba [🔲2].',
          type: 'fill_blank',
          content: {
            blank_123: {
              id: 'blank_123',
              number: 1,
              correctAnswer: 'Luna',
            },
            blank_456: {
              id: 'blank_456',
              number: 2,
              correctAnswer: 'Jose Luis',
            },
          },
        },
        {
          id: 6,
          title: 'El [🔲1] procesa los datos. Donde más se guardan cosas es en la [🔲2].',
          type: 'fill_multiple',
          content: {
            blank_789: {
              id: 'blank_789',
              number: 1,
              options: ['CPU', 'Monitor', 'Teclado'],
              correct: 0,
            },
            blank_101: {
              id: 'blank_101',
              number: 2,
              options: ['CPU', 'Cache', 'LocalStorage'],
              correct: 1,
            },
          },
        },
      ],
    };

    setTimeout(() => {
      setExamData(mockExamData);
      setTimeRemaining(mockExamData.duration);
      setLoading(false);

      // Inicializar el objeto de respuestas
      const initialAnswers = {};
      mockExamData.questions.forEach((question) => {
        initialAnswers[question.id] = null;
      });
      setAnswers(initialAnswers);
    }, 1000);
  }, []);

  // Contador de tiempo
  useEffect(() => {
    if (loading || !examData) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, examData]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    // Aquí se enviarían las respuestas a la API
    console.log('Respuestas a enviar:', answers);

    // Simulación de envío exitoso
    setTimeout(() => {
      // Redirigir a la página de resultados
      window.location.href = '/exam/results';
    }, 1500);
  };

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Cargando examen...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = examData.questions[currentQuestionIndex];
  const answeredQuestions = Object.entries(answers).filter(([id, answer]) =>
    isQuestionAnswered(id)
  ).length;
  const progress = Math.round((answeredQuestions / examData.questions.length) * 100);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ExamHeader
          title={examData.title}
          timeRemaining={formatTime(timeRemaining)}
          onSubmit={() => setShowSubmitModal(true)}
        />

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Navegador de preguntas (visible en pantallas grandes) */}
            <div className="hidden lg:block w-64 shrink-0">
              <QuestionNavigator
                questions={examData.questions}
                currentIndex={currentQuestionIndex}
                answers={answers}
                onSelectQuestion={navigateToQuestion}
              />
            </div>

            {/* Contenido principal */}
            <div className="flex-1">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      Pregunta {currentQuestionIndex + 1} de {examData.questions.length}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tiempo restante: {formatTime(timeRemaining)}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-6">{currentQuestion.title}</h2>

                  {/* Renderizar el tipo de pregunta correspondiente */}
                  {currentQuestion.type === 'single' && (
                    <SingleChoiceQuestion
                      question={currentQuestion}
                      answer={answers[currentQuestion.id]}
                      onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                    />
                  )}

                  {currentQuestion.type === 'multiple' && (
                    <MultipleChoiceQuestion
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || []}
                      onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                    />
                  )}

                  {currentQuestion.type === 'text' && (
                    <ShortAnswerQuestion
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || ''}
                      onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                    />
                  )}

                  {currentQuestion.type === 'match' && (
                    <MatchQuestion
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || {}}
                      onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                    />
                  )}

                  {currentQuestion.type === 'fill_blank' && (
                    <FillBlankQuestion
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || {}}
                      onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                    />
                  )}

                  {currentQuestion.type === 'fill_multiple' && (
                    <FillMultipleQuestion
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || {}}
                      onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                    />
                  )}

                  {!isQuestionAnswered(currentQuestion.id) && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Esta pregunta aún no ha sido respondida. Puedes dejarla en blanco si lo
                        prefieres.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
                  >
                    Anterior
                  </button>

                  {currentQuestionIndex < examData.questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Finalizar examen
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Barra de progreso */}
              <div className="mt-6">
                <ProgressBar progress={progress} />
                <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
                  Has respondido {answeredQuestions} de {examData.questions.length} preguntas
                </p>
              </div>

              {/* Navegador de preguntas (visible en móviles) */}
              <div className="mt-6 lg:hidden">
                <h3 className="text-lg font-medium mb-3">Navegación rápida</h3>
                <div className="flex flex-wrap gap-2">
                  {examData.questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(idx)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
                      ${
                        currentQuestionIndex === idx
                          ? 'bg-purple-600 text-white'
                          : isQuestionAnswered(q.id)
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal de confirmación para enviar examen */}
        {showSubmitModal && (
          <SubmitExamModal
            answeredQuestions={answeredQuestions}
            totalQuestions={examData.questions.length}
            onCancel={() => setShowSubmitModal(false)}
            onConfirm={handleSubmitExam}
          />
        )}
      </div>
    </Layout>
  );
}
