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
  },
  message: {
    getAll: (chatId: string, page: number) => `/message?chatId=${chatId}&limit=50&page=${page}`,
  },
};
