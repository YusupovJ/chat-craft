import axios from "axios";
import { baseURL } from "./urls";
import { getLocalStorage, setLocalStorage } from "./utils";
import { toast } from "sonner";
import { fetchRefresh } from "@/services/authService";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const accessToken = getLocalStorage("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  ({ data, config, headers, statusText }) => ({ ...data, config, headers, statusText }),
  async (error: any) => {
    const originalConfig = error.config;
    if (error.message === "Network Error") {
      toast.error("Network error");
      return Promise.reject(new Error("Network Error"));
    }

    const refreshToken = getLocalStorage("refreshToken");

    if (refreshToken && error.response.status === 401 && !originalConfig.isRetry) {
      originalConfig.isRetry = true;

      const response = await fetchRefresh({ refreshToken });

      const tokens = response.data;

      setLocalStorage("accessToken", tokens.accessToken);
      setLocalStorage("refreshToken", tokens.refreshToken);

      return api.request(originalConfig);
    }

    return Promise.reject(error);
  }
);
