import { AxiosError } from "axios";

export interface IMe {
  username: string;
  avatar: number;
  id: number;
}

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

export interface IError {
  error: string;
  message: string;
  statusCode: number;
}

export interface IRefreshData {
  refreshToken: string;
}

export type TError = AxiosError<IError>;

/* Store */

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
  openModals: { [key: string]: boolean };
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
}
