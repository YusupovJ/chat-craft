import React from "react";
import { NewChat } from "@/components/sidebar/newChat";
import { Settings } from "@/components/sidebar/settings";
import { Modal } from "@/components/ui/modal";
import { UserInfo } from "@/components/sidebar/userInfo";
import { Auth } from "@/components/auth";

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Modal name="auth" closeButton={false}>
        <Auth />
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
