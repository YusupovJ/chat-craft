import { AxiosError } from "axios";

/* Base types ------------ */

export interface IError {
  error: string;
  message: string;
  statusCode: number;
}

export type TError = AxiosError<IError>;

export interface IPagination {
  totalItems: number;
  offset: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface IApiReponse<T> {
  data: T;
  date: string;
  pagination: IPagination | null;
  status: number;
}

/* Auth -------------- */

export interface IMe {
  username: string;
  avatar: number;
  id: number;
  gender: TGenders;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IRegisterData extends ILoginData {
  avatar: number;
}

export interface IRefreshData {
  refreshToken: string;
}

/* Store --------------- */

export interface IAuthStore {
  user: IMe | null;
  isAuthenticated: boolean;
  setUser: (user: IMe | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export type TTheme = "dark" | "light";

export interface IThemeStore {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
  setThemeState: (theme: TTheme) => void;
}

export interface IModalStore {
  openModals: IModal;
  openModal: (name: TModal) => void;
  closeModal: (name: TModal) => void;
}

export type TModal = "auth" | "newchat" | "settings" | "userinfo";
export type IModal = { [key in TModal]?: boolean };

/* --------------------- */

export type TGenders = "man" | "girl" | "croissant" | "steve";
export type IGenders = { [key in TGenders]: string };

export interface IChat {
  id: string;
  name: string;
  messages: IMessage[];
  created_at: string;
  updated_at: string;
}

export interface IMessage {
  id: number;
  content: string;
  user: IMe;
  chat: IChat;
  created_at: string;
  updated_at: string;
}

export interface ICreateChat {
  name: string;
}
