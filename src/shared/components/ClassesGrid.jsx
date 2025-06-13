import { useState } from 'react';
import { motion } from 'motion/react';
import ClassCard from './ClassCard';
import CreateClassModal from '@/modules/teacher/components/CreateClassModal';

export default function ClassesGrid({ classes, rol, showAddButton = false, onClassCreated }) {
  const [showModal, setShowModal] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {classes.map((classItem, index) => (
          <ClassCard key={classItem.id} classItem={classItem} index={index} rol={rol} />
        ))}

        {showAddButton && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-16 h-16 rounded-full bg-purple-600 text-white text-5xl leading-none flex items-center justify-center shadow-xl transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl active:scale-95 focus:outline-none"
              style={{ zIndex: 9999, position: 'relative' }}
            >
              +
            </button>
          </div>
        )}
      </motion.div>

      <CreateClassModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={onClassCreated}
      />
    </>
  );
}
