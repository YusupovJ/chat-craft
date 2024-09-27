import { IModalStore, TModal } from "@/types";
import { create } from "zustand";

export const useModalStore = create<IModalStore>((set) => ({
  openModals: {},
  openModal: (name: TModal) => set((state) => ({ openModals: { ...state.openModals, [name]: true } })),
  closeModal: (...names: TModal[]) =>
    set((state) => {
      const openModals = { ...state.openModals };

      names.forEach((name) => {
        openModals[name] = false;
      });

      return { openModals };
    }),
}));
