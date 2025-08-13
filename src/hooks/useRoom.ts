// hooks/useRooms.js
import { useState, useEffect } from "react";
import {
  createRoom,
  deleteRoom,
  getRooms,
  updateStatusRoom,
  updateRoom,
} from "../api/roomApi";
import type { TRoom, TRoomForm } from "../types";

//Todo: poner todas las funcion con on, para mantener la uniformidad, onDelete, onCreate...

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
      setRooms((prevRooms) => {
        const updatedRooms = [...prevRooms, data];
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        return updatedRooms;
      });
    } catch (err) {
      console.error("Error al crear la sala", err);
    }
  };

  const onEditRoom = async (id:number, room: TRoomForm) => {
    setLoading(true);
    try {
      // console.log("SALA A EDITAR", room)
      await updateRoom(id, room);
      const updatedRooms = rooms.map((r) =>
        r.id === id ? { ...r, room} : r
      );
      setRooms(updatedRooms);
      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error(
        `Error al editar la sala`,
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteOneRoom = async (id: number) => {
    setLoading(true);
    try {
      await deleteRoom(id);
      const filteredRoom = rooms.filter((r) => r.id !== id);
      setRooms(filteredRoom);
      localStorage.setItem("rooms", JSON.stringify(filteredRoom));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error al eliminar la sala", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatusRoom = async (id: number, disponible: boolean) => {
    setLoading(true);
    try {
      await updateStatusRoom(id, disponible);
      const updatedRooms = rooms.map((r) =>
        r.id === id ? { ...r, disponible } : r
      );
      setRooms(updatedRooms);
      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error(
        `Error al ${disponible ? "Activar" : "Desactivar"} la sala`,
        err
      );
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
    toggleStatusRoom,
    onEditRoom,
  };
};
