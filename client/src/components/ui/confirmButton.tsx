import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "./modal";
import { TModal } from "@/types";
import { useModalStore } from "@/store/modal";

interface Props extends ButtonProps {
  confirmText: string;
  modalName: TModal;
}

export const ConfirmButton: FC<Props> = ({ children, confirmText, onClick, modalName, ...props }) => {
  const { openModal, closeModal } = useModalStore();

  return (
    <>
      <Button {...props} onClick={() => openModal(modalName)}>
        {children}
      </Button>
      <Modal name={modalName}>
        <ModalHeader>
          <h3>Потдверждение</h3>
        </ModalHeader>
        <ModalContent>{confirmText}</ModalContent>
        <ModalFooter className="gap-4">
          <Button variant="secondary" onClick={() => closeModal(modalName)}>
            Нет
          </Button>
          <Button onClick={onClick}>Да</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
