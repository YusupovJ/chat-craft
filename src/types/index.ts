export interface IMe {
  username: string;
  avatar: number;
  id: number;
  refreshToken: string | undefined;
  accessToken: string | undefined;
}

export interface IAuthStore {
  updateUser: (username: IMe["username"]) => void;
  updateAvatar: (avatar: IMe["avatar"]) => void;
  updateId: (id: IMe["id"]) => void;
  updateRefreshToken: (token: IMe["refreshToken"]) => void;
  updateAccessToken: (token: IMe["accessToken"]) => void;
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
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: number;
  username: string;
  avatar: number;
}

export interface IMessage {
  id: number;
  content: string;
  user: IUser;
}
