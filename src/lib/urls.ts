export const baseURL = import.meta.env.VITE_BASEURL;

export const urls = {
  auth: {
    refresh: () => "/auth/refresh",
    login: () => "/auth/login",
  },
};
