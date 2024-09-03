import { cn, scrollbarSize } from "@/lib/utils";
import { useModalStore } from "@/store/modal";
import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  name: string;
  children?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  closeButton?: boolean;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  name,
  children,
  closeOnOutsideClick = true,
  closeButton = true,
  className,
}) => {
  const isOpen = useModalStore((state) => state.openModals[name]);
  const { closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      const size = scrollbarSize();
      document.body.style.cssText = `--removed-body-scroll-bar-size: ${size}px`;
      document.body.dataset.scrollLocked = "1";

      return;
    }

    setTimeout(() => {
      document.body.removeAttribute("data-scroll-locked");
    }, 300);
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      closeModal(name);
    }
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 px-3 overflow-auto z-50 py-5 items-center flex justify-center bg-black bg-opacity-50 transition-all duration-300",
        {
          "opacity-100": isOpen,
          "opacity-0": !isOpen,
          invisible: !isOpen,
        },
        className
      )}
      onClick={handleOutsideClick}
    >
      <div
        className={cn(
          "relative bg-background max-w-[400px] h-fit w-full rounded-lg shadow-lg transform transition-transform duration-300",
          {
            "scale-100": isOpen,
            "scale-95": !isOpen,
          }
        )}
      >
        {closeButton && (
          <button className="absolute top-2 right-2 text-xl" onClick={() => closeModal(name)}>
            &times;
          </button>
        )}
        <div className="p-4 space-y-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

// ModalHeader Component
interface ModalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = "" }) => {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
};

// ModalContent Component
interface ModalContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({ children, className = "" }) => {
  return <div className={cn("text-base", className)}>{children}</div>;
};

// ModalFooter Component
interface ModalFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = "" }) => {
  return <div className={cn("flex justify-end", className)}>{children}</div>;
};
