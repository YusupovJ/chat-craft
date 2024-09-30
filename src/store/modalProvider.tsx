import React, { Suspense } from "react";
import { Modal } from "@/components/ui/modal";
import { modalsList } from "@/mock/modals";
import { Loader } from "@/components/loader";

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      {modalsList.map((modal) => (
        <Suspense key={modal.id} fallback={<Loader />}>
          <Modal {...modal.props}>{modal.component}</Modal>
        </Suspense>
      ))}
    </>
  );
};
