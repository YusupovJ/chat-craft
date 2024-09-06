import Container from "./container";
import Logo from "../assets/logo.svg?react";
import { memo } from "react";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import { useModalStore } from "@/store/modal";
import { Link } from "react-router-dom";

const Headers = () => {
  const { openModal } = useModalStore();

  return (
    <header className="bg-primary z-10 backdrop-blur-md p-5 rounded-lg fixed top-0 left-0 right-0">
      <Container className="h-full flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center space-x-2 lg:space-x-5">
          <Logo className="fill-muted" />
          <h1 className="font-bold text-muted text-[14px] lg:text-[18px]">ChatCraft</h1>
        </Link>

        <Button variant="outline" onClick={() => openModal("auth")} className="flex py-0 px-2 gap-2">
          <LogInIcon />
          <span className="hidden lg:block">Войти</span>
        </Button>
      </Container>
    </header>
  );
};

export default memo(Headers);
