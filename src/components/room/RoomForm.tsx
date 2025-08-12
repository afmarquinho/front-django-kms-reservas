import { useEffect, type FormEvent } from "react";
import { useFormRoom } from "../../hooks/useFormRoom";
import { useRoom } from "../../hooks/useRoom";
import type { TRoom, TRoomForm } from "../../types";

const initialRoom: TRoomForm = {
  nombre: "",
  capacidad: 0,
  direccion: "",
  tarifa_por_hora: 0,
};

type RoomFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditRoom: React.Dispatch<React.SetStateAction<TRoom | null>>;
  editRoom: TRoom | null;
};

export const RoomForm = ({
  setIsFormOpen,
  editRoom,
  setEditRoom,
}: RoomFormProps) => {
  const { formValues, error, onInputChange, onSubmit, resetForm } =
    useFormRoom(initialRoom);
  const { createNewRoom, onEditRoom } = useRoom();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
    if (!editRoom) {
      createNewRoom(formValues);
    } else {
      setEditRoom({ ...editRoom, ...formValues });
      onEditRoom(editRoom.id, formValues);
    }
    resetForm(initialRoom);
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    resetForm(initialRoom);
    setIsFormOpen(false);
    setEditRoom(null);
  };

  useEffect(() => {
    if (editRoom) {
      resetForm({
        nombre: editRoom.nombre,
        capacidad: editRoom.capacidad,
        direccion: editRoom.direccion,
        tarifa_por_hora: editRoom.tarifa_por_hora,
      });
    } else {
      resetForm(initialRoom);
    }
  }, [editRoom]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black/70`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mx-auto space-y-4 w-11/12 max-w-[450px]"
      >
        <h2 className="text-2xl font-bold text-center select-none">
          {!editRoom ? "Crear Sala" : `Editar sala: ${editRoom.nombre}`}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium ">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            onChange={onInputChange}
            className="mt-1 py-1.5 px-2 outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={formValues.capacidad}
            onChange={onInputChange}
            className="mt-1 py-1.5 px-2 outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formValues.direccion}
            onChange={onInputChange}
            className="mt-1 py-1.5 px-2 outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Tarifa por hora</label>
          <input
            type="number"
            name="tarifa_por_hora"
            value={formValues.tarifa_por_hora}
            onChange={onInputChange}
            className="mt-1 py-1.5 px-2 outline-none block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
