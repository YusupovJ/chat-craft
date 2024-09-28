import { MESSAGE_LIMIT } from "./constants";

export const baseURL = import.meta.env.VITE_BASEURL;

export const urls = {
  auth: {
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  chat: {
    create: "/chat",
    getAll: "/chat",
    getOne: (id?: string) => `/chat/${id}`,
  },
  message: {
    getAll: (chatId?: string, page?: number) => `/message?chatId=${chatId}&limit=${MESSAGE_LIMIT}&page=${page || 1}`,
  },
  upload: {
    add: "/upload",
  },
};
