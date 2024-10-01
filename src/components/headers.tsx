import Logo from "../assets/logo.svg?react";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import { useModalStore } from "@/store/modal";
import { Link } from "react-router-dom";

export const Headers = () => {
  const { openModal } = useModalStore();

  return (
    <header className="bg-primary z-10 backdrop-blur-md py-5 rounded-b-lg fixed top-0 left-0 right-0">
      <div className="h-full container flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center space-x-2 lg:space-x-5">
          <Logo className="fill-muted" />
          <h1 className="font-bold text-muted text-[14px] lg:text-[18px]">ChatCraft</h1>
        </Link>

        <Button
          variant="outline"
          aria-label="Войти в аккаунт"
          onClick={() => openModal("auth")}
          className="flex py-0 px-2 gap-2"
        >
          <LogInIcon />
          <span className="hidden lg:block">Войти</span>
        </Button>
      </div>
    </header>
  );
};
