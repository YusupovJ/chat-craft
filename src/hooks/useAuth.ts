import { LOGIN_KEY, REGISTER_KEY } from "@/lib/constants";
import { login, register } from "@/services/authService";
import { ILoginData, IRegisterData, ITokens, TError } from "@/types";
import { useMutation } from "react-query";

export const useSignIn = () => {
  return useMutation<ITokens, TError, ILoginData>(LOGIN_KEY, login);
};

export const useSignUp = () => {
  return useMutation<ITokens, TError, IRegisterData>(REGISTER_KEY, register);
};
