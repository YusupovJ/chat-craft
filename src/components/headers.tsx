import Container from "./container";
import Logo from "../assets/logo.svg?react";
import { memo } from "react";
import Avatars from "./avatars";
import { DropdownMenuRadioGroupDemo } from "./dropdown";
import Login from "./login";
import { useAuthStore } from "@/store/auth";

const Headers = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className=" bg-[rgb(22,163,74)] z-10 backdrop-blur-md p-5 rounded-lg fixed top-0 left-0 right-0">
      <Container className="h-full flex items-center justify-between gap-3">
        <div className="flex items-center space-x-5">
          <Logo />
          <h1 className="font-bold text-white text-[14px] lg:text-[18px]">Craft_Chat</h1>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <span className="hidden lg:flex">
              <Avatars index={user?.avatar || 2} />
            </span>
            <DropdownMenuRadioGroupDemo name={user?.username} />
          </div>
        ) : (
          <Login />
        )}
      </Container>
    </div>
  );
};

export default memo(Headers);
