import axios from "axios";
import { api } from "./api";
import { baseURL, urls } from "./urls";
import { toast } from "sonner";
import { getLocalStorage, setLocalStorage } from "./utils";
import { IApiReponse, ITokens } from "@/types";

export const errorInterceptor = async (error: any) => {
  const originalConfig = error.config;
  if (error.message === "Network Error") {
    toast.error("Network error");
    return Promise.reject(new Error("Network Error"));
  }

  const accessToken = getLocalStorage("accessToken");
  const refreshToken = getLocalStorage("refreshToken");

  if (accessToken || refreshToken) {
    if (error?.response?.status === 401 && !originalConfig.isRetry) {
      originalConfig.isRetry = true;

      const response = await axios.post<IApiReponse<ITokens>>(baseURL + urls.auth.refresh, {
        refreshToken,
      });

      const tokens = response.data.data;

      setLocalStorage("accessToken", tokens.accessToken);
      setLocalStorage("refreshToken", tokens.refreshToken);

      return api.request(originalConfig);
    }
  }
  return Promise.reject(error);
};
