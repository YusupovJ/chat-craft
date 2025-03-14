import { LOGIN_KEY, LOGOUT_KEY, REGISTER_KEY } from "@/lib/constants";
import { fetchLogin, fetchLogout, fetchRegister } from "@/services/authService";
import { ILoginData, IRegisterData, ITokens, TError } from "@/types";
import { useMutation } from "react-query";

export const useSignIn = () => {
  return useMutation<ITokens, TError, ILoginData>(LOGIN_KEY, fetchLogin);
};

export const useSignUp = () => {
  return useMutation<ITokens, TError, IRegisterData>(REGISTER_KEY, fetchRegister);
};

export const useLogout = () => {
  return useMutation<void, TError, null>(LOGOUT_KEY, fetchLogout);
};
