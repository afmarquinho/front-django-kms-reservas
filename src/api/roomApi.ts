// api/rooms.js
import type { TRoomForm } from "../types";
import axiosClient from "./axiosClient";

export const getRooms = () => axiosClient.get("/rooms/");
export const getRoomById = (id:number) => axiosClient.get(`/rooms/${id}/`);
export const createRoom = (data:TRoomForm) => axiosClient.post("/rooms/", data);
// export const updateRoom = (id, data) => axiosClient.put(`/rooms/${id}`, data);
export const deleteRoom = (id:number) => axiosClient.delete(`/rooms/${id}/`);
