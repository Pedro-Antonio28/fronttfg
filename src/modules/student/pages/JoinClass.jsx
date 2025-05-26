import { useState } from "react";
import Layout from "../../../shared/components/Layout";
import { motion } from "motion/react";
import logo from '@/shared/assets/images/logo.png';
import logo_blanco from '@/shared/assets/images/logo_blanco.png';
import axios from "@/shared/functions/axiosConfig";
import { useNavigate } from 'react-router-dom';

const JoinClass = () => {
  const navigate = useNavigate();
  const [classCode, setClassCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!classCode) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/student/join-class", {
        join_code: classCode,
      });
      navigate("/student/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Error al unirse a la clase.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Layout>
        <div className="max-w-md mx-auto mt-12 px-4">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg"
          >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex justify-center mb-6"
            >
              <>
                <img src={logo} alt="Logo LUDUS claro" className="h-60 w-auto block dark:hidden" />
                <img src={logo_blanco} alt="Logo LUDUS oscuro" className="h-60 w-auto hidden dark:block" />
              </>
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Unirse a una clase</h1>

            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Introduce el código proporcionado por tu profesor para unirte a la clase
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                    htmlFor="classCode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Código de clase
                </label>
                <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <input
                      id="classCode"
                      type="text"
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                      placeholder="Ej: ABC123"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                  />
                </motion.div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

              <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                ) : null}
                {isLoading ? "Uniéndose..." : "Unirse"}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-purple-500 hover:text-purple-400 text-sm">
                Volver al inicio
              </a>
            </div>
          </motion.div>
        </div>
      </Layout>
  );
};

export default JoinClass;
