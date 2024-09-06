import { cn } from "@/lib/utils";
import { FC } from "react";
import Logo from "@/assets/logo.svg?react";
import { Settings, User, MessageCirclePlus } from "lucide-react";
import { useModalStore } from "@/store/modal";
import { ButtonTooltip } from "@/lib/tooltip";

interface Props {
  className?: string;
}

const Sidebar: FC<Props> = ({ className }) => {
  const { openModal } = useModalStore();

  return (
    <div className={cn("flex flex-col justify-between py-7", className)}>
      <div className="flex flex-col items-center px-3">
        <Logo className="fill-accent-foreground w-8 h-8" />
        <h2 className="text-xs mt-2">ChatCraft</h2>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ButtonTooltip message={"создать новый чат"}>
          <MessageCirclePlus onClick={() => openModal("newchat")} stroke="inherit" size="32" />
        </ButtonTooltip>
        <ButtonTooltip message={"информация о пользователе"}>
          <User onClick={() => openModal("userinfo")} stroke="inherit" size="32" />
        </ButtonTooltip>
        <ButtonTooltip message={"настройки"}>
          <Settings onClick={() => openModal("settings")} stroke="inherit" size="32" />
        </ButtonTooltip>
      </div>
    </div>
  );
};

export default Sidebar;
