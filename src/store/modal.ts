import { IModalStore, TModals } from "@/types";
import { create } from "zustand";

export const useModalStore = create<IModalStore>((set) => ({
  openModals: {},
  openModal: (name: TModals) => set((state) => ({ openModals: { ...state.openModals, [name]: true } })),
  closeModal: (name: TModals) => set((state) => ({ openModals: { ...state.openModals, [name]: false } })),
}));
