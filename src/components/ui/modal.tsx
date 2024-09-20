import { useRemoveScroll } from "@/hooks/useRemoveScroll";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/modal";
import { TModal } from "@/types";
import { FC } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  name: TModal;
  children?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  closeButton?: boolean;
  className?: string;
}

interface ModalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

interface ModalContentProps {
  children?: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children?: React.ReactNode;
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

  useRemoveScroll(isOpen);

  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      closeModal(name);
    }
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 px-3 overflow-auto z-50 py-5 flex justify-center bg-black bg-opacity-50 transition-all duration-300",
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
          "relative bg-background max-w-[400px] mt-[10vh] h-fit w-full rounded-lg shadow-lg transform transition-transform duration-300",
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
        <div className="space-y-2">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = "" }) => {
  return <div className={cn("text-lg font-semibold px-4 pt-4", className)}>{children}</div>;
};

export const ModalContent: React.FC<ModalContentProps> = ({ children, className = "" }) => {
  return <div className={cn("text-base p-4", className)}>{children}</div>;
};

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = "" }) => {
  return <div className={cn("flex justify-end px-4 pb-4", className)}>{children}</div>;
};
