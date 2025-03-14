import { cn } from "@/lib/utils";
import { FC } from "react";
import Logo from "@/assets/logo.svg?react";
import { Settings, User, MessageCirclePlus } from "lucide-react";
import { useModalStore } from "@/store/modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  const { openModal } = useModalStore();

  return (
    <div className={cn("flex flex-col justify-between py-7", className)}>
      <div className="flex flex-col items-center px-3">
        <Logo className="fill-accent-foreground w-8 h-8" />
        <h2 className="text-xs mt-2">ChatCraft</h2>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Tooltip message="Создать чат">
          <Button variant="ghost" aria-label="Создать чат" onClick={() => openModal("newchat")}>
            <MessageCirclePlus stroke="inherit" size="32" />
          </Button>
        </Tooltip>
        <Tooltip message="Информация о пользователе">
          <Button variant="ghost" aria-label="Информация о пользователе" onClick={() => openModal("userinfo")}>
            <User stroke="inherit" size="32" />
          </Button>
        </Tooltip>
        <Tooltip message="Настройки">
          <Button variant="ghost" aria-label="Настройки" onClick={() => openModal("settings")}>
            <Settings stroke="inherit" size="32" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
