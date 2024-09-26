import axios, { AxiosError } from "axios";
import { baseURL } from "./urls";
import { delLocalStorage, getLocalStorage, setLocalStorage } from "./utils";
import { toast } from "sonner";
import { fetchRefresh } from "@/services/authService";
import { io } from "socket.io-client";

export const api = axios.create({ baseURL });
export const socket = io(baseURL);

api.interceptors.request.use((config) => {
  const accessToken = getLocalStorage("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  ({ data, config, headers, statusText }) => ({ ...data, config, headers, statusText }),
  async (error: AxiosError) => {
    const originalConfig = error.config;
    if (error.message === "Network Error") {
      toast.error("Network error");
      return Promise.reject(new Error("Network Error"));
    }

    const refreshToken = getLocalStorage("refreshToken");

    if (refreshToken && error.response?.status === 401 && originalConfig && !originalConfig?.isRetry) {
      originalConfig.isRetry = true;

      try {
        const response = await fetchRefresh({ refreshToken });
        const tokens = response.data;

        setLocalStorage("accessToken", tokens.accessToken);
        setLocalStorage("refreshToken", tokens.refreshToken);
      } catch (error) {
        delLocalStorage("accessToken", "refreshToken");
      }

      return api.request(originalConfig);
    }

    return Promise.reject(error);
  }
);
