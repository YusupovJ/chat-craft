import { useModalStore } from "@/store/modal";
import { useEffect } from "react";

export const useRemoveScroll = () => {
  const { openModals } = useModalStore();

  useEffect(() => {
    const isOpen = Object.values(openModals).filter(Boolean).length;

    if (isOpen) {
      const scrollbarSize = window.innerWidth - document.body.clientWidth;
      document.body.style.cssText = `--removed-body-scroll-bar-size: ${scrollbarSize}px`;
      document.body.dataset.scrollLocked = "1";

      return;
    }

    setTimeout(() => {
      document.body.removeAttribute("data-scroll-locked");
    }, 300);
  }, [openModals]);
};
