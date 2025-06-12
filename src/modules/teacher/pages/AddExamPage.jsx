import { useEffect, useState } from 'react';
import CreateQuestionModal from '../components/CreateQuestionModal';
import axios from "@/shared/functions/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import Layout from '../../../shared/components/Layout';
import { motion, AnimatePresence } from "framer-motion";

const AddExamPage = () => {
  const { classId, examId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [almacenPreguntas, setAlmacenPreguntas] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    title: "",
    type: "",
    tags: [],
    content: null,
  });

  const questionTypes = {
    single: { label: "Opción única" },
    multiple: { label: "Opción múltiple" },
    text: { label: "Respuesta de texto" },
    match: { label: "Emparejamiento" },
    fill_blank: { label: "Rellenar hueco" },
    fill_multiple: { label: "Huecos múltiples" },
  };

  const formatQuestionContent = (type, content) => {
    switch (type) {
      case 'single':
        return { correct: content.correct_option, options: content.options };
      case 'multiple':
        return { correct: content.correct_options, options: content.options };
      case 'text':
        return { answer: content.answer };
      case 'match':
        return { pairs: content.pairs };
      case 'fill_blank':
        return Object.entries(content)
          .filter(([key]) => key.startsWith('blank_'))
          .map(([, blank]) => ({ blanks: [blank.correctAnswer], position: blank.number - 1 }));
      case 'fill_multiple':
        return Object.entries(content)
          .filter(([key]) => key.startsWith('blank_'))
          .map(([, blank]) => ({ options: blank.options, correct: blank.correct, position: blank.number - 1 }));
      default:
        return {};
    }
  };

  // Cargar datos del examen en modo edición
  useEffect(() => {
    if (examId) {
      (async () => {
        try {
          const res = await axios.get(`/teacher/test/${examId}`);
          const test = res.data;
          setTitle(test.title);
          setDate(test.exam_date);
          setDurationMinutes(String(Number(test.total_seconds) / 60));
          const loadedPregs = test.questions.map((q) => ({
            id: q.id,
            name: q.name,
            type: q.type,
            tags: (q.tags || []).map((tag) => (typeof tag === "string" ? tag : tag.name ?? tag.value)),
            content: q.answer,
          }));
          setPreguntas(loadedPregs);
          setQuestionIds(loadedPregs.map((q) => q.id));
        } catch (error) {
          console.error("Error cargando examen:", error);
          alert("No se pudo cargar los datos del examen.");
        }
      })();
    }
  }, [examId]);

  // Cargar preguntas del banco
  useEffect(() => {
    const cargarPreguntasBanco = async () => {
      try {
        const res = await axios.get("/teacher/bank-questions");
        if (Array.isArray(res.data)) {
          setAlmacenPreguntas(res.data);
        } else if (Array.isArray(res.data.data)) {
          setAlmacenPreguntas(res.data.data);
        } else {
          console.warn("Formato inesperado en respuesta del banco de preguntas:", res.data);
          setAlmacenPreguntas([]);
        }
      } catch (error) {
        console.error("Error al cargar preguntas del banco:", error);
        setAlmacenPreguntas([]);
      }
    };
    cargarPreguntasBanco();
  }, []);

  const añadirDesdeBanco = (pregunta) => {
    if (!questionIds.includes(pregunta.id)) {
      setPreguntas((prev) => [
        ...prev,
        {
          id: pregunta.id,
          name: pregunta.title || pregunta.name || "",
          type: pregunta.type || "single",
          tags: pregunta.tags ?? [],
          content: pregunta.content || pregunta.answer,
        },
      ]);
      setQuestionIds((prev) => [...prev, pregunta.id]);
    }
  };

  const eliminarPregunta = (id) => {
    setPreguntas((prev) => prev.filter((p) => p.id !== id));
    setQuestionIds((prev) => prev.filter((pid) => pid !== id));
  };

  const handleEditPregunta = (pregunta) => {
    setQuestionForm({
      title: pregunta.name || pregunta.title || "",
      type: pregunta.type || "single",
      content: pregunta.content || formatQuestionContent(pregunta.type, pregunta.answer || {}),
      tags: (pregunta.tags || []).map((tag) => (typeof tag === 'string' ? tag : tag.name ?? tag.value)),
    });
    setCurrentQuestion(pregunta);
    setShowModal(true);
  };

  const handleSaveQuestion = async () => {
    try {
      const res = await axios.post("/teacher/question", {
        name: questionForm.title.trim(),
        type: questionForm.type,
        tags: questionForm.tags ?? [],
        answer: formatQuestionContent(questionForm.type, questionForm.content),
        return: "full",
      });

      setPreguntas((prev) => {
        const nuevaPregunta = { ...questionForm, id: res.data.id };
        if (currentQuestion && currentQuestion.id) {
          return prev.map((p) => (p.id === currentQuestion.id ? nuevaPregunta : p));
        }
        return [...prev, nuevaPregunta];
      });

      if (res?.data?.id) {
        setQuestionIds((prev) => [...prev, res.data.id]);
      } else {
        console.warn("No se recibió un ID válido al guardar la pregunta", res);
      }

      setShowModal(false);
      setQuestionForm({ title: "", type: "", tags: [], content: null });
      setCurrentQuestion(null);
    } catch (error) {
      console.error("Error al guardar la pregunta:", error.response?.data || error);
      alert("Error al guardar la pregunta. Verifica el contenido o el formato.");
    }
  };

  const handleSaveExam = async () => {
    try {
      if (!title.trim() || !date || !durationMinutes || questionIds.length === 0) {
        alert("Por favor, completa todos los campos del examen y añade al menos una pregunta.");
        return;
      }

      if (examId) {
        await axios.put(`/teacher/test/${examId}`, {
          title: title.trim(),
          class_id: classId,
          exam_date: date,
          total_seconds: String(Number(durationMinutes) * 60),
          question_ids: questionIds,
        });
        alert("Examen actualizado con éxito 🎉");
      } else {
        await new Promise((res) => setTimeout(res, 500));
        const examRes = await axios.post("/teacher/test", {
          title: title.trim(),
          class_id: classId,
          exam_date: date,
          total_seconds: String(Number(durationMinutes) * 60),
        });
        const testId = examRes.data.id;
        await axios.post("/teacher/question/assign-test", {
          question_ids: questionIds,
          test_id: testId,
        });
        alert("Examen guardado y preguntas asignadas con éxito 🎉");
      }

      navigate(`/teacher/class/${classId}/activities`);
    } catch (error) {
      console.error("Error al guardar el examen:", error.response?.data || error);
      if (error.response?.data?.errors) {
        alert(
          "Error de validación: " +
          Object.entries(error.response.data.errors)
            .map(([campo, msgs]) => `${campo}: ${msgs.join(", ")}`)
            .join(" | ")
        );
      } else if (error.response?.data?.error) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Ocurrió un error guardando el examen. Revisa la consola.");
      }
    }
  };

  const tagOptions = [];


  return (
    <Layout isTeacher={true}>
      <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 py-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto shadow-2xl rounded-2xl bg-white dark:bg-gray-900 p-10 space-y-12"
        >
          <button
            onClick={() => navigate(`/teacher/class/${classId}/activities`)}
            className="mb-4 text-sm text-[#7B61FF] font-semibold hover:underline flex items-center gap-1"
          >
            ← Volver a actividades
          </button>

          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-center text-[#7B61FF] drop-shadow-sm"
          >
            {examId ? "Editar Examen" : "Crear Examen"}
          </motion.h1>

          <div className="md:flex gap-8">
            {/* Columna izquierda */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="md:w-2/3 space-y-8"
            >
              {/* Datos del examen */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner">
                <input
                  type="text"
                  placeholder="Título del examen"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7B61FF] focus:border-[#7B61FF] bg-white dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7B61FF] focus:border-[#7B61FF] bg-white dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Duración (minutos)"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7B61FF] focus:border-[#7B61FF] bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Sección preguntas */}
              <motion.div whileHover={{ scale: 1.01 }} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#7B61FF]">Preguntas del examen</h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#7B61FF] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center gap-2"
                  >
                    ➕ Añadir pregunta
                  </button>
                </div>
              </motion.div>

              {/* Banco de preguntas */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner">
                <h2 className="text-lg font-semibold mb-4 text-[#7B61FF]">Seleccionar del banco</h2>
                <div className="border dark:border-gray-600 p-4 rounded-lg max-h-72 overflow-y-auto space-y-3 bg-white dark:bg-gray-700">
                  {almacenPreguntas.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-300">No hay preguntas disponibles.</p>
                  ) : (
                    <AnimatePresence>
                      {almacenPreguntas
                        .filter((q) => !preguntas.some((p) => p.id === q.id))
                        .map((q) => (
                          <motion.div
                            key={q.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white dark:bg-gray-600 p-3 rounded shadow flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-transform duration-200 transform hover:scale-[1.01]"
                          >
                            <div>
                              <p className="font-medium">{q.title || q.name}</p>
                              <p className="text-xs text-gray-500 capitalize">{q.type}</p>
                            </div>
                            <button
                              onClick={() => añadirDesdeBanco(q)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                            >
                              ➕ Añadir
                            </button>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Columna derecha */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="md:w-1/3 space-y-6 mt-10 md:mt-0"
            >
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
                <h2 className="text-md font-bold text-[#7B61FF] mb-4 text-center">
                  Lista de preguntas ({preguntas.length})
                </h2>
                <div className="space-y-3">
                  <AnimatePresence>
                    {preguntas.map((pregunta) => (
                      <motion.div
                        key={pregunta.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm flex justify-between items-center hover:bg-purple-50 dark:hover:bg-purple-600 transition-all duration-200"
                      >
                        <div onClick={() => handleEditPregunta(pregunta)} className="cursor-pointer w-full">
                          <p className="font-medium">{pregunta.name || pregunta.title || 'Pregunta sin título'}</p>
                          <p className="text-xs text-gray-500 capitalize">{pregunta.type}</p>
                        </div>
                        <button
                          onClick={() => eliminarPregunta(pregunta.id)}
                          className="ml-3 text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold text-lg"
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} className="text-center mt-2">
                  <button
                    onClick={handleSaveExam}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold shadow"
                  >
                    ✅ {examId ? 'Actualizar Examen' : 'Guardar Examen'}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* MODAL */}
          <CreateQuestionModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setCurrentQuestion(null);
            }}
            questionForm={questionForm}
            setQuestionForm={setQuestionForm}
            onSave={handleSaveQuestion}
            currentQuestion={currentQuestion}
            questionTypeOptions={Object.entries(questionTypes).map(([value, { label }]) => ({
              value,
              label,
            }))}
            questionTypes={questionTypes}
            tagOptions={tagOptions}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddExamPage;
