import axios from "axios";
import { baseURL } from "./urls";
import { errorInterceptor } from "./errorIntercepters";
import { getLocalStorage } from "./utils";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const accessToken = getLocalStorage("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (result) => {
    return { ...result.data, config: result.config, headers: result.headers, statusText: result.statusText };
  },
  (error) => errorInterceptor(error)
);
