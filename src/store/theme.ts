import { setLocalStorage } from "@/lib/utils";
import { IThemeStore, TTheme } from "@/types";
import { create } from "zustand";

export const useThemeStore = create<IThemeStore>((set) => ({
  theme: "light",
  setThemeState: (theme: TTheme) => {
    set(() => ({ theme }));
  },
  setTheme: (theme: TTheme) => {
    setLocalStorage("theme", theme);
    set(() => ({ theme }));
  },
}));
