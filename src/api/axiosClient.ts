import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // URL base de tu backend
  timeout: 5000, // opcional, en ms
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient