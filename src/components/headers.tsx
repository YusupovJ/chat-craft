import Container from "./container";
import Logo from "../assets/logo.svg?react";
import { getToken } from "@/lib/tokens";
import { memo } from "react";
import Avatars from "./avatars";
import { DropdownMenuRadioGroupDemo } from "./dropdown";
import Login from "./login";
import { useAuthStore } from "@/store/auth";

const Headers = () => {
  const avatar = useAuthStore((state) => state.avatar);
  const username = useAuthStore((state) => state.username);
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <div className=" bg-[rgb(22,163,74)] z-10 backdrop-blur-md p-5 rounded-lg fixed top-0 left-0 right-0">
      <Container className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Logo />
          <h1 className="font-bold text-white text-[18px]">Craft_Chat</h1>
        </div>
        {getToken("accessToken") && accessToken ? (
          <div className="flex items-center space-x-3">
            <Avatars index={avatar || 2} />
            <DropdownMenuRadioGroupDemo name={username} />
          </div>
        ) : (
          <Login />
        )}
      </Container>
    </div>
  );
};

export default memo(Headers);
