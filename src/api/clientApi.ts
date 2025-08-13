import type { TClientForm } from "../types";
import axiosClient from "./axiosClient";

export const getClients = () => axiosClient.get("/clients/");
export const createClient = (data: TClientForm) =>
  axiosClient.post("/clients/", data);
export const updateClient = (id: number, data: TClientForm) =>
  axiosClient.patch(`/clients/${id}/`, data);
export const deleteRoom = (id: number) => axiosClient.delete(`/clients/${id}/`);
