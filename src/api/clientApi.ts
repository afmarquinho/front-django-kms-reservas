import axiosClient from "./axiosClient";

export const getClients = async () => {
  try {
    const res = await axiosClient.get("/clients/");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
