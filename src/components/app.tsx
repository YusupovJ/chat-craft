import { Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Home from "./home";
import { Toaster } from "./ui/sonner";
import AuthProvider from "@/store/authProvider";
import ThemeProvider from "@/store/themeProvider";
import { useThemeStore } from "@/store/theme";
import ModalProvider from "@/store/modalProvider";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <ThemeProvider defaultTheme="light">
      <ModalProvider>
        <AuthProvider>
          <Toaster closeButton richColors theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/chat" element={<Chat unselected />} />
          </Routes>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
