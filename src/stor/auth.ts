import { create } from "zustand";

export const useAuthStor = create<IMe & IAuthStor>((set) => ({
  username: "",
  avatar: 0,
  id: 0,
  accessToken: "",
  refreshToken: "",
  updateUser: (username) => set(() => ({ username })),
  updateAvatar: (avatar) => set(() => ({ avatar })),
  updateId: (id) => set(() => ({ id })),
  updateRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
  updateAccessToken: (accessToken) => set(() => ({ accessToken })),
}));
