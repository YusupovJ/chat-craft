import { IAuthStore, IMe } from "@/types";
import { create } from "zustand";

export const useAuthStore = create<IMe & IAuthStore>((set) => ({
  username: "",
  avatar: 0,
  id: 0,
  accessToken: "",
  refreshToken: "",
  updateUser: (username: string) => set(() => ({ username })),
  updateAvatar: (avatar: number) => set(() => ({ avatar })),
  updateId: (id: number) => set(() => ({ id })),
  updateRefreshToken: (refreshToken?: string) => set(() => ({ refreshToken })),
  updateAccessToken: (accessToken?: string) => set(() => ({ accessToken })),
}));
