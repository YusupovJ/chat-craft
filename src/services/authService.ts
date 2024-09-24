import { api } from "@/lib/api";
import { baseURL, urls } from "@/lib/urls";
import { IApiReponse, ILoginData, IRefreshData, IRegisterData, ITokens } from "@/types";
import axios from "axios";

export const fetchLogin = async (loginData: ILoginData) => {
  const { data } = await api.post<ITokens>(urls.auth.login, loginData);
  return data;
};

export const fetchRegister = async (registerData: IRegisterData) => {
  const { data } = await api.post<ITokens>(urls.auth.signup, registerData);
  return data;
};

export const fetchRefresh = async (refreshData: IRefreshData) => {
  const { data } = await axios.post<IApiReponse<ITokens>>(baseURL + urls.auth.refresh, refreshData);
  return data;
};

export const fetchLogout = async () => {
  await api.post(urls.auth.logout);
};
