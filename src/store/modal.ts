import { IModalStore, TModal } from "@/types";
import { create } from "zustand";

export const useModalStore = create<IModalStore>((set) => ({
  openModals: {},
  openModal: (name: TModal) => set((state) => ({ openModals: { ...state.openModals, [name]: true } })),
  closeModal: (name: TModal) => set((state) => ({ openModals: { ...state.openModals, [name]: false } })),
}));
