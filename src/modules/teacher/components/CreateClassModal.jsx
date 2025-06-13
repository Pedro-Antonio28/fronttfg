import { useState } from 'react';
import Modal from '@/shared/components/Modal';
import axios from '@/shared/functions/axiosConfig';

const CreateClassModal = ({ isOpen, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/teacher/classes', {
        name,
        color,
      });
      onCreated?.(response.data); // puedes actualizar la lista de clases si pasas este callback
      onClose();
      setName('');
      setColor('');
    } catch (err) {
      setError('Error al crear la clase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-2xl font-semibold mb-4">Crear nueva clase</h2>
      <div className="flex flex-col gap-12 w-full my-12">
        <input
          type="text"
          placeholder="Nombre de la clase"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white w-full"
        />
        <input
          type="color"
          value={color || '#000000'}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 cursor-pointer"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleCreate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear clase'}
        </button>
      </div>
    </Modal>
  );
};

export default CreateClassModal;
