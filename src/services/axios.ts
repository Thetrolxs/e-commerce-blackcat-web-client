import axios from "axios";
import Cookies from "js-cookie";

export const ApiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiBackend.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ApiBackend.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/login";
    }

    if (status === 403) {
      alert("No tienes permisos para esta acción");
    }

    if (status === 500) {
      console.error("Error interno del servidor");
    }
    return Promise.reject(error);
  }
);
