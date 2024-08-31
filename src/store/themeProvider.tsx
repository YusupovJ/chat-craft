import { TTheme } from "@/types";
import { FC, ReactNode, useEffect } from "react";
import { useThemeStore } from "./theme";
import { getLocalStorage } from "@/lib/utils";

interface Props {
  defaultTheme: TTheme;
  children?: ReactNode;
}

const ThemeProvider: FC<Props> = ({ defaultTheme, children }) => {
  const { theme, setThemeState } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const configuredTheme = getLocalStorage("theme") as TTheme;
    setThemeState(configuredTheme || defaultTheme);
  }, [defaultTheme]);

  return children;
};

export default ThemeProvider;
