import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  BookOpen,
  CheckSquare,
  PenLine,
  Link2,
  Type,
  Grid3X3,
  Edit,
  Trash2,
  X,
  ChevronDown,
} from 'lucide-react';
import Layout from '../../../shared/components/Layout';
import CreateQuestionModal from '../components/CreateQuestionModal';
import axios from '@/shared/functions/axiosConfig';

const questionTypes = {
  single: { icon: BookOpen, label: 'Opción única', color: 'bg-blue-500' },
  multiple: { icon: CheckSquare, label: 'Selección múltiple', color: 'bg-green-500' },
  text: { icon: PenLine, label: 'Respuesta escrita', color: 'bg-yellow-500' },
  match: { icon: Link2, label: 'Emparejar', color: 'bg-purple-500' },
  fill_blank: { icon: Type, label: 'Rellenar huecos', color: 'bg-orange-500' },
  fill_multiple: { icon: Grid3X3, label: 'Huecos múltiples', color: 'bg-red-500' },
};

const getAllTags = (questions) => {
  const allTags = questions.flatMap((question) => question.tags);
  return [...new Set(allTags)].sort();
};

function CustomSelect({ value, onValueChange, options, placeholder, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newValue) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StorageBank() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    title: '',
    type: 'single',
    tags: '',
    content: {},
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get('/teacher/bank-questions');
        setQuestions(data.data);
        console.log(data);
      } catch (error) {
        console.error('Error cargando preguntas del banco:', error);
      }
    };

    fetchQuestions();
  }, []);

  const allTags = getAllTags(questions);
  const tagSelectOptions = allTags.map((tag) => ({ label: tag, value: tag }));

  // Opciones para los selects
  const typeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    ...Object.entries(questionTypes).map(([key, type]) => ({
      value: key,
      label: type.label,
    })),
  ];

  const tagOptions = [
    { value: 'all', label: 'Todas las etiquetas' },
    ...allTags.map((tag) => ({ value: tag, label: tag })),
  ];

  const questionTypeOptions = Object.entries(questionTypes).map(([key, type]) => ({
    value: key,
    label: type.label,
  }));

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      searchTerm === '' || question.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || question.type === selectedType;
    const matchesTag = selectedTag === 'all' || question.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesTag;
  });

  const handleCreateQuestion = () => {
    setQuestionForm({
      title: '',
      type: 'single',
      tags: [],
      content: {},
    });
    setCurrentQuestion(null);
    setIsCreateModalOpen(true);
  };

  const handleEditQuestion = (question) => {
    setQuestionForm({
      title: question.title,
      type: question.type,
      tags: question.tags.map((tag) => (typeof tag === 'string' ? tag : tag.value)),
      content: question.content || {},
    });
    setCurrentQuestion(question);
    setIsCreateModalOpen(true);
  };

  const handleSaveQuestion = () => {
    console.log(questionForm);
    const formattedQuestion = {
      title: questionForm.title.trim(),
      type: questionForm.type,
      tags: questionForm.tags.map((tag) => tag.trim()).filter(Boolean),
      content: questionForm.content, // <-- ahora es uniforme
    };

    // Simula envío (luego se reemplaza por axios.post('/questions', formattedQuestion))
    console.log('Pregunta formateada:', formattedQuestion);

    if (currentQuestion) {
      setQuestions(
        questions.map((q) => (q.id === currentQuestion.id ? { ...q, ...formattedQuestion } : q))
      );
    } else {
      setQuestions([
        { ...formattedQuestion, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] },
        ...questions,
      ]);
    }

    setIsCreateModalOpen(false);
  };

  return (
    <Layout>
      <div className=" bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 transition-colors">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Almacén de Preguntas
                </h1>
                <p className="text-gray-600 dark:text-slate-400 mt-1">
                  Gestiona y organiza todas tus preguntas
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCreateQuestion}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Pregunta
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <CustomSelect
                value={selectedType}
                onValueChange={setSelectedType}
                options={typeOptions}
                placeholder="Filtrar por tipo"
                className="w-full sm:w-56"
              />

              <CustomSelect
                value={selectedTag}
                onValueChange={setSelectedTag}
                options={tagOptions}
                placeholder="Filtrar por etiqueta"
                className="w-full sm:w-56"
              />

              {(selectedType !== 'all' || selectedTag !== 'all' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedTag('all');
                    setSearchTerm('');
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por título (opcional)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-2 text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {(selectedType !== 'all' || selectedTag !== 'all') && (
              <div className="flex flex-wrap gap-2">
                {selectedType !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-xs rounded-md">
                    Tipo: {questionTypes[selectedType].label}
                    <button
                      onClick={() => setSelectedType('all')}
                      className="ml-2 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
                    Etiqueta: {selectedTag}
                    <button
                      onClick={() => setSelectedTag('all')}
                      className="ml-2 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredQuestions.map((question) => {
                const QuestionIcon = questionTypes[question.type].icon;
                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors rounded-lg">
                      <div className="p-4 pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${questionTypes[question.type].color}`}>
                              <QuestionIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-xs rounded">
                                {questionTypes[question.type].label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {question.title}
                        </h3>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {(question.tags || []).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-400 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-slate-400">
                            {question.createdAt}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditQuestion(question)}
                              className="p-1 text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-slate-400 mb-2">
                No se encontraron preguntas
              </h3>
              <p className="text-gray-500 dark:text-slate-500 mb-4">
                {selectedType !== 'all' || selectedTag !== 'all' || searchTerm !== ''
                  ? 'Intenta ajustar los filtros para ver más resultados'
                  : 'Crea tu primera pregunta para comenzar'}
              </p>
              {(selectedType !== 'all' || selectedTag !== 'all' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedTag('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  Limpiar todos los filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Create Question Modal */}
        {isCreateModalOpen && (
          <CreateQuestionModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            questionForm={questionForm}
            setQuestionForm={setQuestionForm}
            onSave={handleSaveQuestion}
            currentQuestion={currentQuestion}
            questionTypeOptions={questionTypeOptions}
            questionTypes={questionTypes}
            tagOptions={tagSelectOptions}
          />
        )}
      </div>
    </Layout>
  );
}
