import axios from "axios";
import { baseURL } from "./urls";
import { errorInterceptor } from "./errorIntercepters";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (result) => result.data,
  (error) => errorInterceptor(error)
);
