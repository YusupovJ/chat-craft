import Login from "@/components/login";
import NewChat from "@/components/newChat";
import Settings from "@/components/settings";
import { Modal } from "@/components/ui/modal";
import UserInfo from "@/components/userInfo";
import React from "react";

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Modal name="auth">
        <Login />
      </Modal>
      <Modal name="newchat">
        <NewChat />
      </Modal>
      <Modal name="settings">
        <Settings />
      </Modal>
      <Modal name="userinfo">
        <UserInfo />
      </Modal>
    </>
  );
};

export default ModalProvider;
