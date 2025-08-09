import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DB_URI,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});
