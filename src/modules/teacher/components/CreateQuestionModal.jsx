import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, X, ChevronDown } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import CreatableSelect from 'react-select/creatable';

function generateTextWithPlaceholders(originalText, blanks) {
  if (!originalText || !blanks) return originalText;

  // Si ya contiene [🔲n], no hacer nada
  if (originalText.includes('[🔲')) return originalText;

  const blankList = Object.values(blanks).sort((a, b) => a.number - b.number);
  const parts = originalText.split('___');

  let rebuilt = '';
  for (let i = 0; i < parts.length; i++) {
    rebuilt += parts[i];
    if (i < blankList.length) {
      rebuilt += `[🔲${blankList[i].number}]`;
    }
  }

  return rebuilt;
}

function QuestionTypeForm({ type, onChange, content }) {
  switch (type) {
    case 'single':
      return <SingleChoiceForm onChange={onChange} initialContent={content} />;
    case 'multiple':
      return <MultipleChoiceForm onChange={onChange} initialContent={content} />;
    case 'text':
      return <TextResponseForm />;
    case 'match':
      return <MatchingForm onChange={onChange} initialContent={content} />;
    case 'fill_blank':
      return <FillBlankForm onChange={onChange} initialContent={content} />;
    case 'fill_multiple':
      return <FillMultipleForm onChange={onChange} initialContent={content} />;
    default:
      return null;
  }
}

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

const CreateQuestionModal = ({
  isOpen,
  onClose,
  questionForm,
  setQuestionForm,
  onSave,
  currentQuestion,
  questionTypeOptions,
  questionTypes,
  tagOptions,
}) => {
  const updateForm = (field, value) => {
    setQuestionForm((prev) => ({ ...prev, [field]: value }));
  };
  const isDark = document.documentElement.classList.contains('dark');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {currentQuestion ? 'Editar Pregunta' : 'Crear Nueva Pregunta'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            {!['fill_blank', 'fill_multiple'].includes(questionForm.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Título de la pregunta
                </label>
                <input
                  type="text"
                  value={questionForm.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  placeholder="Escribe tu pregunta aquí..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Tipo de pregunta
              </label>
              <CustomSelect
                value={questionForm.type}
                onValueChange={(value) => updateForm('type', value)}
                options={questionTypeOptions}
                placeholder="Selecciona un tipo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Etiquetas (separadas por comas)
              </label>
              <CreatableSelect
                isMulti
                options={tagOptions}
                noOptionsMessage={() => 'No hay más opciones disponibles'}
                value={(questionForm.tags || []).map((tag) =>
                  typeof tag === 'string' ? { label: tag, value: tag } : tag
                )}
                onChange={(newValue) =>
                  updateForm(
                    'tags',
                    newValue.map((opt) => opt.value)
                  )
                }
                placeholder="Añadir etiquetas..."
                className="text-black dark:text-white"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: isDark ? '#1e293b' : '#ffffff', // slate-800 o blanco
                    borderColor: isDark ? '#4b5563' : '#d1d5db', // gray-600 o gray-300
                    color: isDark ? 'white' : 'black',
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    color: isDark ? 'white' : 'black',
                    zIndex: 99,
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused
                      ? isDark
                        ? '#4f46e5' // purple-600
                        : '#e5e7eb' // gray-200
                      : isDark
                        ? '#1e293b'
                        : '#ffffff',
                    color: isDark ? 'white' : 'black',
                    cursor: 'pointer',
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#7c3aed', // purple-600
                    color: 'white',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                  input: (base) => ({
                    ...base,
                    color: isDark ? 'white' : 'black',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: isDark ? '#cbd5e1' : '#6b7280', // slate-300 o gray-500
                  }),
                }}
              />
            </div>

            <QuestionTypeForm
              type={questionForm.type}
              content={
                ['fill_blank', 'fill_multiple'].includes(questionForm.type)
                  ? {
                      text: generateTextWithPlaceholders(questionForm.title, questionForm.content),
                      blanks: questionForm.content,
                    }
                  : questionForm.content
              }
              onChange={(content) => {
                if (['fill_blank', 'fill_multiple'].includes(questionForm.type)) {
                  const { text, blanks } = content;
                  updateForm('title', text || '');
                  updateForm('content', blanks);
                } else {
                  updateForm('content', content);
                }
              }}
            />
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">
              Vista Previa
            </h3>
            <QuestionPreview questionForm={questionForm} questionTypes={questionTypes} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={!questionForm.title.trim()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            {currentQuestion ? 'Actualizar Pregunta' : 'Guardar Pregunta'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

function SingleChoiceForm({ onChange, initialContent }) {
  const [options, setOptions] = useState(initialContent?.options || ['', '']);
  const [correctOption, setCorrectOption] = useState(initialContent?.correct_option || 0);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctOption >= newOptions.length) {
        setCorrectOption(newOptions.length - 1);
      }
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  useEffect(() => {
    onChange({ options, correct_option: correctOption });
  }, [options, correctOption]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
        Opciones de respuesta
      </label>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="radio"
              name="correct-option"
              checked={correctOption === index}
              onChange={() => setCorrectOption(index)}
              className="w-4 h-4 text-purple-600 border-gray-300 dark:border-slate-600 focus:ring-purple-500"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Opción ${index + 1}`}
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Añadir opción
      </button>

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Selecciona la opción correcta marcando el círculo correspondiente (mínimo 2 opciones)
      </p>
    </div>
  );
}

function MultipleChoiceForm({ onChange, initialContent }) {
  const [options, setOptions] = useState(initialContent?.options || ['', '']);
  const [correctOptions, setCorrectOptions] = useState(() => {
    const correct = initialContent?.correct_options || [];
    return options.map((_, i) => correct.includes(i));
  });

  const addOption = () => {
    setOptions([...options, '']);
    setCorrectOptions([...correctOptions, false]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      const newCorrect = correctOptions.filter((_, i) => i !== index);
      setOptions(newOptions);
      setCorrectOptions(newCorrect);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const updateCorrect = (index, checked) => {
    const newCorrect = [...correctOptions];
    newCorrect[index] = checked;
    setCorrectOptions(newCorrect);
  };

  useEffect(() => {
    const correctOptionsFinal = correctOptions
      .map((isCorrect, i) => (isCorrect ? i : null))
      .filter((i) => i !== null);
    onChange({ options, correct_options: correctOptionsFinal });
  }, [options, correctOptions]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
        Opciones de respuesta
      </label>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={correctOptions[index]}
              onChange={(e) => updateCorrect(index, e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 dark:border-slate-600 rounded focus:ring-purple-500"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Opción ${index + 1}`}
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Añadir opción
      </button>

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Marca todas las opciones correctas (mínimo 2 opciones)
      </p>
    </div>
  );
}

function TextResponseForm() {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-600/30 rounded-lg p-3">
        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
          ⚠️ Las respuestas de texto requieren revisión manual del profesor
        </p>
      </div>
    </div>
  );
}

function MatchingForm({ onChange, initialContent }) {
  const [pairs, setPairs] = useState(
    initialContent?.pairs || [
      { left: '', right: '' },
      { left: '', right: '' },
    ]
  );

  const addPair = () => {
    setPairs([...pairs, { left: '', right: '' }]);
  };

  const removePair = (index) => {
    if (pairs.length > 2) {
      const newPairs = pairs.filter((_, i) => i !== index);
      setPairs(newPairs);
    }
  };

  const updatePair = (index, side, value) => {
    const newPairs = [...pairs];
    newPairs[index][side] = value;
    setPairs(newPairs);
  };

  useEffect(() => {
    onChange({ pairs });
  }, [pairs]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
        Elementos a emparejar
      </label>

      <div className="space-y-3">
        {pairs.map((pair, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 items-center">
            <div>
              {index === 0 && (
                <label className="block text-xs text-gray-500 dark:text-slate-400 mb-2">
                  Columna izquierda
                </label>
              )}
              <input
                type="text"
                value={pair.left}
                onChange={(e) => updatePair(index, 'left', e.target.value)}
                placeholder={`Elemento ${index + 1}`}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                {index === 0 && (
                  <label className="block text-xs text-gray-500 dark:text-slate-400 mb-2">
                    Columna derecha
                  </label>
                )}
                <input
                  type="text"
                  value={pair.right}
                  onChange={(e) => updatePair(index, 'right', e.target.value)}
                  placeholder={`Pareja ${index + 1}`}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {pairs.length > 2 && (
                <button
                  type="button"
                  onClick={() => removePair(index)}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors mt-6"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPair}
        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Añadir par
      </button>

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Crea pares de elementos para emparejar (mínimo 2 pares)
      </p>
    </div>
  );
}

function FillBlankForm({ onChange, initialContent }) {
  const [text, setText] = useState(initialContent?.text || '');
  const [blanks, setBlanks] = useState(initialContent?.blanks || {});
  const [selectedBlank, setSelectedBlank] = useState(null);
  const [blankCounter, setBlankCounter] = useState(() => {
    if (!initialContent?.blanks) return 0;
    const max = Object.values(initialContent.blanks).map((b) => b.number || 0);
    return max.length > 0 ? Math.max(...max) : 0;
  });
  const textareaRef = useRef(null);

  const addBlank = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const blankId = `blank_${Date.now()}`;
    const newBlankNumber = blankCounter + 1;

    const newText = text.slice(0, start) + `[🔲${newBlankNumber}]` + text.slice(end);
    setText(newText);

    setBlanks((prev) => ({
      ...prev,
      [blankId]: {
        correctAnswer: '',
        id: blankId,
        number: newBlankNumber,
      },
    }));

    setBlankCounter(newBlankNumber);

    setTimeout(() => {
      const newPosition = start + `[🔲${newBlankNumber}]`.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const removeBlank = (blankId) => {
    const blankToRemove = blanks[blankId];
    if (!blankToRemove) return;

    const blankPattern = new RegExp(`\\[🔲${blankToRemove.number}\\]`, 'g');
    setText((prev) => prev.replace(blankPattern, ''));

    setBlanks((prev) => {
      const newBlanks = { ...prev };
      delete newBlanks[blankId];
      return newBlanks;
    });

    setSelectedBlank(null);
  };

  const updateBlank = (blankId, field, value) => {
    setBlanks((prev) => ({
      ...prev,
      [blankId]: {
        ...prev[blankId],
        [field]: value,
      },
    }));
  };

  const handleTextClick = (e) => {
    const textarea = e.target;
    const clickPosition = textarea.selectionStart;

    const blankMatches = text.match(/\[🔲\d+\]/g);
    if (blankMatches) {
      let currentPos = 0;
      for (const blankMatch of blankMatches) {
        const blankStart = text.indexOf(blankMatch, currentPos);
        const blankEnd = blankStart + blankMatch.length;

        if (clickPosition >= blankStart && clickPosition <= blankEnd) {
          const blankNumber = Number.parseInt(blankMatch.match(/\d+/)[0]);
          const blankId = Object.keys(blanks).find((id) => blanks[id].number === blankNumber);
          if (blankId) {
            setSelectedBlank(blankId);
            return;
          }
        }
        currentPos = blankEnd;
      }
    }

    setSelectedBlank(null);
  };

  useEffect(() => {
    onChange({ text, blanks });
  }, [text, blanks]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
        Texto con huecos
      </label>

      <div className="space-y-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={handleTextClick}
          placeholder="Escribe tu texto aquí. Usa el botón 'Añadir hueco' para insertar espacios en blanco donde esté el cursor."
          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white min-h-[100px] font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
        />

        <button
          type="button"
          onClick={addBlank}
          className="px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Añadir hueco
        </button>
      </div>

      {text && (
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
          <label className="block text-xs text-gray-500 dark:text-slate-400 mb-2">
            Vista previa:
          </label>
          <div className="text-gray-900 dark:text-white">
            {text.split(/(\[🔲\d+\])/).map((part, index) => {
              if (part.match(/\[🔲\d+\]/)) {
                const blankNumber = Number.parseInt(part.match(/\d+/)[0]);
                const blankId = Object.keys(blanks).find((id) => blanks[id].number === blankNumber);

                return (
                  <span
                    key={index}
                    onClick={() => setSelectedBlank(blankId)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors ${
                      selectedBlank === blankId
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-slate-200'
                    }`}
                  >
                    🔲 Hueco {blankNumber}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBlank(blankId);
                      }}
                      className="ml-1 text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                );
              }
              return <span key={index}>{part}</span>;
            })}
          </div>
        </div>
      )}

      {selectedBlank && blanks[selectedBlank] && (
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-purple-500">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-purple-600 dark:text-purple-400">
              🔲 Editando Hueco {blanks[selectedBlank].number}
            </label>
            <button
              type="button"
              onClick={() => setSelectedBlank(null)}
              className="p-1 text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs text-gray-700 dark:text-slate-300 mb-2">
              Respuesta correcta
            </label>
            <input
              type="text"
              value={blanks[selectedBlank].correctAnswer}
              onChange={(e) => updateBlank(selectedBlank, 'correctAnswer', e.target.value)}
              placeholder="Escribe la respuesta correcta"
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Haz click en "Añadir hueco" para insertar un espacio en blanco donde esté el cursor. Luego
        haz click en cada hueco para configurar la respuesta correcta.
      </p>
    </div>
  );
}

function FillMultipleForm({ onChange, initialContent }) {
  const [text, setText] = useState(initialContent?.text || '');
  const [blanks, setBlanks] = useState(initialContent?.blanks || {});
  const [selectedBlank, setSelectedBlank] = useState(null);
  const [blankCounter, setBlankCounter] = useState(() => {
    if (!initialContent?.blanks) return 0;
    const max = Object.values(initialContent.blanks).map((b) => b.number || 0);
    return max.length > 0 ? Math.max(...max) : 0;
  });
  const textareaRef = useRef(null);

  const addBlank = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const blankId = `blank_${Date.now()}`;
    const newBlankNumber = blankCounter + 1;

    const newText = text.slice(0, start) + `[🔲${newBlankNumber}]` + text.slice(end);
    setText(newText);

    setBlanks((prev) => ({
      ...prev,
      [blankId]: {
        options: ['', ''],
        correct: 0,
        id: blankId,
        number: newBlankNumber,
      },
    }));

    setBlankCounter(newBlankNumber);

    setTimeout(() => {
      const newPosition = start + `[🔲${newBlankNumber}]`.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const removeBlank = (blankId) => {
    const blankToRemove = blanks[blankId];
    if (!blankToRemove) return;

    const blankPattern = new RegExp(`\\[🔲${blankToRemove.number}\\]`, 'g');
    setText((prev) => prev.replace(blankPattern, ''));

    setBlanks((prev) => {
      const newBlanks = { ...prev };
      delete newBlanks[blankId];
      return newBlanks;
    });

    setSelectedBlank(null);
  };

  const updateBlank = (blankId, field, value) => {
    setBlanks((prev) => ({
      ...prev,
      [blankId]: {
        ...prev[blankId],
        [field]: value,
      },
    }));
  };

  const addOptionToBlank = (blankId) => {
    setBlanks((prev) => ({
      ...prev,
      [blankId]: {
        ...prev[blankId],
        options: [...prev[blankId].options, ''],
      },
    }));
  };

  const removeOptionFromBlank = (blankId, optionIndex) => {
    const blank = blanks[blankId];
    if (blank.options.length > 2) {
      const newOptions = blank.options.filter((_, i) => i !== optionIndex);
      setBlanks((prev) => ({
        ...prev,
        [blankId]: {
          ...prev[blankId],
          options: newOptions,
          correct:
            prev[blankId].correct >= newOptions.length
              ? newOptions.length - 1
              : prev[blankId].correct,
        },
      }));
    }
  };

  const updateBlankOption = (blankId, optionIndex, value) => {
    setBlanks((prev) => ({
      ...prev,
      [blankId]: {
        ...prev[blankId],
        options: prev[blankId].options.map((opt, i) => (i === optionIndex ? value : opt)),
      },
    }));
  };

  const handleTextClick = (e) => {
    const textarea = e.target;
    const clickPosition = textarea.selectionStart;

    const blankMatches = text.match(/\[🔲\d+\]/g);
    if (blankMatches) {
      let currentPos = 0;
      for (const blankMatch of blankMatches) {
        const blankStart = text.indexOf(blankMatch, currentPos);
        const blankEnd = blankStart + blankMatch.length;

        if (clickPosition >= blankStart && clickPosition <= blankEnd) {
          const blankNumber = Number.parseInt(blankMatch.match(/\d+/)[0]);
          const blankId = Object.keys(blanks).find((id) => blanks[id].number === blankNumber);
          if (blankId) {
            setSelectedBlank(blankId);
            return;
          }
        }
        currentPos = blankEnd;
      }
    }

    setSelectedBlank(null);
  };

  useEffect(() => {
    onChange({ text, blanks });
  }, [text, blanks]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
        Texto con huecos múltiples
      </label>

      <div className="space-y-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={handleTextClick}
          placeholder="Escribe tu texto aquí. Usa el botón 'Añadir hueco' para insertar espacios con opciones múltiples donde esté el cursor."
          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white min-h-[100px] font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
        />

        <button
          type="button"
          onClick={addBlank}
          className="px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Añadir hueco
        </button>
      </div>

      {text && (
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
          <label className="block text-xs text-gray-500 dark:text-slate-400 mb-2">
            Vista previa:
          </label>
          <div className="text-gray-900 dark:text-white">
            {text.split(/(\[🔲\d+\])/).map((part, index) => {
              if (part.match(/\[🔲\d+\]/)) {
                const blankNumber = Number.parseInt(part.match(/\d+/)[0]);
                const blankId = Object.keys(blanks).find((id) => blanks[id].number === blankNumber);

                return (
                  <span
                    key={index}
                    onClick={() => setSelectedBlank(blankId)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors ${
                      selectedBlank === blankId
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-slate-200'
                    }`}
                  >
                    🔲 Hueco {blankNumber}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBlank(blankId);
                      }}
                      className="ml-1 text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                );
              }
              return <span key={index}>{part}</span>;
            })}
          </div>
        </div>
      )}

      {selectedBlank && blanks[selectedBlank] && (
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-purple-500">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-purple-600 dark:text-purple-400">
              🔲 Editando Hueco {blanks[selectedBlank].number}
            </label>
            <button
              type="button"
              onClick={() => setSelectedBlank(null)}
              className="p-1 text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs text-gray-700 dark:text-slate-300">
              Opciones para este hueco
            </label>
            <div className="space-y-3">
              {blanks[selectedBlank].options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`blank-${selectedBlank}-options`}
                    checked={blanks[selectedBlank].correct === optionIndex}
                    onChange={() => updateBlank(selectedBlank, 'correct', optionIndex)}
                    className="w-4 h-4 text-purple-600 border-gray-300 dark:border-slate-600 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateBlankOption(selectedBlank, optionIndex, e.target.value)}
                    placeholder={`Opción ${optionIndex + 1}`}
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {blanks[selectedBlank].options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOptionFromBlank(selectedBlank, optionIndex)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addOptionToBlank(selectedBlank)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Añadir opción
            </button>

            <div className="bg-gray-100 dark:bg-slate-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-slate-400">
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  Respuesta correcta:
                </span>{' '}
                {blanks[selectedBlank].options[blanks[selectedBlank].correct] || 'Sin seleccionar'}
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-slate-400">
        Haz click en "Añadir hueco" para insertar un espacio con opciones múltiples donde esté el
        cursor. Luego haz click en cada hueco para configurar sus opciones y marcar la correcta.
      </p>
    </div>
  );
}

function QuestionPreview({ questionForm, questionTypes }) {
  const { title, type, tags } = questionForm;

  return (
    <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg">
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-600">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {title || 'Título de la pregunta'}
        </h4>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
          <p>
            <span className="font-medium text-gray-700 dark:text-slate-300">Tipo:</span>{' '}
            {questionTypes[type]?.label || 'Sin tipo'}
          </p>
          <p>
            <span className="font-medium text-gray-700 dark:text-slate-300">Etiquetas:</span>{' '}
            {Array.isArray(tags) && tags.length > 0
              ? tags.map((tag) => (typeof tag === 'string' ? tag : tag.label || '')).join(', ')
              : 'Sin etiquetas'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestionModal;
