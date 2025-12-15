import axios from "axios";
import { toast } from "react-toastify";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:1010",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    if (res.data?.message) {
    }
    return res.data;
  },
  (err) => {
    if (!err.response) {
      toast.error("Network Error");
      return Promise.reject(err);
    }

    const { status, data } = err.response;

    if (status === 400) {
      if (Array.isArray(data.error)) {
        toast.error(data.error[0]);
      } else {
        toast.error(data.error || "Bad Request");
      }
      return Promise.reject(err);
    }

    if (status === 403) {
      toast.error(data.error || "Forbidden");
      logout();
      return Promise.reject(err);
    }

    if (status === 404) {
      toast.info(data.error || "Not Found");
      return Promise.reject(err);
    }

    if (status === 409) {
      toast.error(data.error || "Conflict");
      return Promise.reject(err);
    }

    if (status === 408) {
      toast.error(data.error || "Request Timeout");
      return Promise.reject(err);
    }

    if (status === 502) {
      toast.error(data.error || "Payment Error");
      return Promise.reject(err);
    }

    if (status >= 500) {
      toast.error("Server Error");
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default api;
