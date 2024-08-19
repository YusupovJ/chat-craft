export interface IMe {
  username: string;
  avatar: number;
  id: number;
}

export interface IAuthStore {
  user: IMe | null;
  isAuthenticated: boolean;
  setUser: (user: IMe | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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
  created_at: string;
  updated_at: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
