import Container from "./container";
import Logo from "../assets/logo.svg?react";
import Login from "./login";
import { getToken } from "@/lib/tokens";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useEffect, useState } from "react";
import Avatars from "./avatars";
import { DropdownMenuRadioGroupDemo } from "./dropdown";
import { toast } from "sonner";

const Headers = () => {
  const [me, setMe] = useState<IMeResult>();
  useEffect(() => {
    api.get(`${urls.auth.me}`).then((res) => setMe(res));
  }, []);

  if (me) {
    toast.success(`добро пожаловать ${me.data.username}`);
  }

  return (
    <div className=" bg-[rgb(22,163,74)] z-10 backdrop-blur-md p-5 rounded-lg fixed top-0 left-0 right-0">
      <Container className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Logo />
          <h1 className="font-bold text-white text-[18px]">Craft_Chat</h1>
        </div>
        {getToken("accessToken") ? (
          <div className="flex items-center space-x-3">
            <Avatars index={me?.data?.avatar || 2} />
            <DropdownMenuRadioGroupDemo name={me?.data?.username} />
          </div>
        ) : (
          <Login />
        )}
      </Container>
    </div>
  );
};

export default Headers;
