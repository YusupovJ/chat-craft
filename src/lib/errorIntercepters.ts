import axios from "axios";
import { api } from "./api";
import { baseURL, urls } from "./urls";
import { toast } from "sonner";
import { storageAccessToken, storageRefreshToken } from "./tokens";

export const errorInterceptor = async (error: any) => {
  const originalConfig = error.config;
  if (error.message === "Network Error") {
    toast.error("Network error");
    return Promise.reject(new Error("Network Error"));
  }

  const accessToken = window.localStorage.getItem("accessToken");
  const refreshToken = window.localStorage.getItem("refreshToken");

  if (accessToken || refreshToken) {
    if (error?.response?.status === 401 && !originalConfig.isRetry) {
      originalConfig.isRetry = true;

      const response = await axios.post(baseURL + urls.auth.refresh, {
        refreshToken,
      });

      const tokens = response.data.data;

      storageAccessToken(tokens.accessToken);
      storageRefreshToken(tokens.refreshToken);

      return api.request(originalConfig);
    }
  }
  return Promise.reject(error);
};
