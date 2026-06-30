import axios from "axios";
import { storage } from "@/lib/storage";

/**
 * Axios instance for the LokLink REST API.
 * Set VITE_API_BASE_URL to point at your Express backend (e.g. http://localhost:5000/api).
 */
export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      storage.clearToken();
      storage.clearUser();
    }
    return Promise.reject(error);
  },
);
