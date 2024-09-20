import { useEffect } from "react";

export const useRemoveScroll = (isOpen?: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const scrollbarSize = window.innerWidth - document.body.clientWidth;
      document.body.style.cssText = `--removed-body-scroll-bar-size: ${scrollbarSize}px`;
      document.body.dataset.scrollLocked = "1";

      return;
    }

    setTimeout(() => {
      document.body.removeAttribute("data-scroll-locked");
    }, 300);
  }, [isOpen]);
};
