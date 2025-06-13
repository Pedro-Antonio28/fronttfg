import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/shared/functions/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical } from "lucide-react";

const ClassMembersBase = ({ userRole }) => {
  const { classId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`/${userRole}/class/${classId}/members`);
        if (Array.isArray(res.data)) {
          setMembers(res.data);
        } else {
          console.error("Respuesta inesperada:", res.data);
          setMembers([]);
        }
      } catch (error) {
        console.error("Error al cargar los miembros:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [classId, userRole]);

  const handleRemove = async (memberId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas echar al estudiante de la clase?");
    if (!confirmed) return;

    try {
      await axios.delete(`/${userRole}/class/${classId}/member/${memberId}`);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error("Error al eliminar el miembro:", error);
    }
  };

  if (loading) return <p className="text-center mt-8 text-gray-500">Cargando miembros...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Miembros de la clase
      </h2>
      {members.length === 0 ? (
        <p className="text-center text-gray-500">No hay miembros registrados.</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {members.map((member, index) => (
              <motion.li
                key={member.id}
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200 relative"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`http://ludustfg.test/storage/${member.profile_img}`}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 dark:text-white">
                      {member.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Estudiante</span>
                  </div>
                </div>

                {userRole === "teacher" && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown((prev) => (prev === member.id ? null : member.id))
                      }
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openDropdown === member.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                      >
                        <button
                          onClick={() => handleRemove(member.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-b"
                        >
                          Echar de la clase
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default ClassMembersBase;
