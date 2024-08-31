import { cn } from "@/lib/utils";
import { FC } from "react";
import Logo from "@/assets/logo.svg?react";
import { Button } from "./ui/button";
import { Settings, User } from "lucide-react";
import { useModalStore } from "@/store/modal";

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
        <Button onClick={() => openModal("userinfo")} variant="ghost">
          <User stroke="inherit" size="32" />
        </Button>
        <Button variant="ghost">
          <Settings onClick={() => openModal("settings")} stroke="inherit" size="32" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
