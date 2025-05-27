import { useState } from 'react';
import Modal from '@/shared/components/Modal';
import { useClass } from '../services/ClassContext';

const ClassSettingsModal = ({ isOpen, onClose }) => {
    const {
        joinCode,
        fetchJoinCode,
        copyToClipboard,
        loadingCode,
    } = useClass();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-xl font-semibold mb-4">Ajustes de la clase</h2>

      <div className="text-white mb-6">
        <p className="mb-2">Puedes compartir este código con tus alumnos para que se unan:</p>
        <div className="flex items-center gap-2">
          <input
            value={joinCode || ""}
            readOnly
            placeholder="Código no disponible"
            className="px-4 py-2 rounded bg-gray-700 text-white w-full"
          />
          <button
            onClick={copyToClipboard}
            disabled={!joinCode}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Copiar
          </button>
        </div>
      </div>

      <button
        onClick={fetchJoinCode}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded mt-4"
      >
        {loadingCode ? "Generando..." : "Generar código"}
      </button>
    </Modal>
  );
};

export default ClassSettingsModal;
