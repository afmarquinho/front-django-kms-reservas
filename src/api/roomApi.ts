// api/rooms.js
import type { TRoomForm } from "../types";
import axiosClient from "./axiosClient";

export const getRooms = () => axiosClient.get("/rooms/");
export const getByIdRoom = (id: number) => axiosClient.get(`/rooms/${id}/`);
export const createRoom = (data: TRoomForm) => {
  axiosClient.post("/rooms/", data);
};
export const updateStatusRoom = (id: number, disponible: boolean) => {
  axiosClient.patch(`/rooms/${id}/`, { disponible });
};
export const updateRoom = (id: number, data: TRoomForm) =>
  axiosClient.patch(`/rooms/${id}/`, data);

export const deleteRoom = (id: number) => axiosClient.delete(`/rooms/${id}/`);
