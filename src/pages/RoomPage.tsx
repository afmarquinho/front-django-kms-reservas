import { HomeIcon } from "lucide-react";
import RoomTable from "../components/room/RoomTable";
import { useRoom } from "../hooks/useRoom";
import type { TRoom } from "../types";
import { useNavigate } from "react-router-dom";

/* Aquí puedes importar tus llamadas a la API que actualizan estado:
   por ejemplo: updateRoomAvailability, deleteRoom, etc. */

const RoomPage = () => {
  const { rooms, loading, error, deleteOneRoom, toggleStatusRoom } = useRoom();

  const navigate = useNavigate();

  

  const handleToggleState = async (room: TRoom) => {
    const confirm = window.confirm(
      `¿Vas a cambiar la disponibilidad de la sala "${room.nombre}"?.`
    );
    if (!confirm) return;

    toggleStatusRoom(room.id, !room.disponible);
  };

  const handleDelete = async (room: TRoom) => {
    const confirm = window.confirm(
      `¿Eliminar la sala "${room.nombre}"? Esta acción no se puede deshacer.`
    );
    if (!confirm) return;
    deleteOneRoom(room.id);
  };

  if (loading) return <p className="p-4">Cargando salas...</p>;
  if (error) return <p className="p-4 text-red-600">Error al cargar salas</p>;

  return (
    <>
      <div className="p-6">
        <button
          className={`bg-gray-400 px-3 py-1.5 hover:bg-gray-700 text-white text-sm rounded-md shadow-sm focus:outline-none mb-3`}
          onClick={() => navigate(-1)}
        >
          <HomeIcon />
        </button>

        <h1 className="text-2xl font-bold mb-2 flex-1">Gestión de Salas</h1>

        <RoomTable
          rooms={rooms}
          onToggleState={handleToggleState}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default RoomPage;
