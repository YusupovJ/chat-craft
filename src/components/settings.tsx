import { useThemeStore } from "@/store/theme";
import { ModalContent, ModalHeader } from "./ui/modal";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <ModalHeader>
        <h2>Настройки</h2>
      </ModalHeader>
      <ModalContent className="flex items-center justify-between space-x-2">
        <Label htmlFor="dark-mode">Ночной режим</Label>
        <Switch id="dark-mode" onCheckedChange={toggleTheme} checked={theme === "dark"} />
      </ModalContent>
    </>
  );
};

export default Settings;
