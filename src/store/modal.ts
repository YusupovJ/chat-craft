import { IModalStore } from "@/types";
import { create } from "zustand";

export const useModalStore = create<IModalStore>((set) => ({
  openModals: {},
  openModal: (name: string) => set((state) => ({ openModals: { ...state.openModals, [name]: true } })),
  closeModal: (name: string) => set((state) => ({ openModals: { ...state.openModals, [name]: false } })),
}));
