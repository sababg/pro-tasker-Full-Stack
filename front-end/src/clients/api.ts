import axios from "axios";

export const token = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((req) => {
  if (token()) req.headers.Authorization = `Bearer ${token()}`;
  return req;
});

export const apiWithCallback = async <T>(
  request: () => Promise<T>,
  onSuccess?: () => void | Promise<void>,
) => {
  const result = await request();
  if (onSuccess) await onSuccess();
  return result;
};
