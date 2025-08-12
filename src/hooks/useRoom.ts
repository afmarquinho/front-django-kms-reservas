// hooks/useRooms.js
import { useState, useEffect } from "react";
import { createRoom, deleteRoom, getRooms } from "../api/roomApi";
import type { TRoom, TRoomForm } from "../types";

export const useRoom = () => {
  const [rooms, setRooms] = useState<TRoom[]>([]); //Rooms que vienen de la base de datos con el get
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cachedRooms = localStorage.getItem("rooms");

    if (cachedRooms) {
      // Si hay datos en localStorage, los usamos
      setRooms(JSON.parse(cachedRooms));
      setLoading(false);
    } else {
      loadRooms();
    }
  }, []);

  const loadRooms = async () => {
    try {
      const { data } = await getRooms();
      setRooms(data);
      localStorage.setItem("rooms", JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error al cargar las salas", err);
    } finally {
      setLoading(false);
    }
  };

  const createNewRoom = async (room: TRoomForm) => {
    try {
      const { data } = await createRoom(room);
      console.log(data);
      setRooms((prevRooms) => {
        const updatedRooms = [...prevRooms, data];
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        return updatedRooms;
      });
    } catch (err) {
      console.error("Error al crear la sala", err);
    }
  };

  const deleteOneRoom = async (id: number) => {
    setLoading(true)
    try {
      await deleteRoom(id);
      const filteredRoom = rooms.filter((room) => room.id !== id);
      setRooms(filteredRoom);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error al eliminar la sala", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    rooms,
    loading,
    error,
    reload: loadRooms,
    setRooms,
    createNewRoom,
    deleteOneRoom,
  };
};
