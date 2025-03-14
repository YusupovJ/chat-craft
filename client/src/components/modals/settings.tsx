import { useThemeStore } from "@/store/theme";
import { ModalContent, ModalHeader } from "../ui/modal";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useThemeStore();
  const [chatPosition, setChatPosition] = useState("right");
  window.localStorage.setItem("chatPosition", chatPosition);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <ModalHeader>
        <h2>Настройки</h2>
      </ModalHeader>
      <ModalContent className="flex flex-col gap-4">
        <span className="flex justify-between items-center">
          <Label htmlFor="dark-mode" className="text-sm font-medium">
            Ночной режим
          </Label>
          <Switch id="dark-mode" onCheckedChange={toggleTheme} checked={theme === "dark"} />
        </span>
        <span className="flex justify-between items-center">
          <Label htmlFor="chat-position" className="text-sm font-medium">
            Положение чата
          </Label>
          <select
            id="chat-position"
            className="border border-gray-600 dark:bg-[rgb(26,26,26)] rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
            value={chatPosition}
            onChange={(e) => setChatPosition(e.target.value)}
          >
            <option value="left">Слева</option> {/*test*/}
            <option value="right">Справа</option>
          </select>
        </span>
      </ModalContent>
    </>
  );
};

export default Settings;
