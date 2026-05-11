import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const previewQuery = async (question: string) => {
  const res = await api.post("/api/query/preview", { question });
  return res.data;
};

export const executeQuery = async (query: string) => {
  const res = await api.post("/api/query/execute", { query });
  return res.data;
};
export default api;
