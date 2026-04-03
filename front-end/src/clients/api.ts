import axios from "axios";

export const token = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

api.interceptors.request.use((req) => {
  if (token()) req.headers.Authorization = `Bearer ${token()}`;
  return req;
});

export const apiWithCallback = async <T>(
  request: () => Promise<T>,
  onSuccess?: () => void | Promise<void>,
  setLoading?: (loading: boolean) => void,
) => {
  try {
    setLoading?.(true);
    const result = await request();
    if (onSuccess) await onSuccess();
    return result;
  } finally {
    setLoading?.(false);
  }
};
