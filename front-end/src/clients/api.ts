import axios from "axios";

export const token = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((req) => {
  if (token()) req.headers.Authorization = `Bearer ${token()}`;
  return req;
});
