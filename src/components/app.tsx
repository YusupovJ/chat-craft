import { Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Home from "./home";
import { Toaster } from "./ui/sonner";
import AuthProvider from "@/store/authProvider";
import ThemeProvider from "@/store/themeProvider";
import { useThemeStore } from "@/store/theme";
import ModalProvider from "@/store/modalProvider";
import NotFound from "./notFound";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const App = () => {
  const { theme } = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <ModalProvider>
          <AuthProvider>
            <Toaster closeButton richColors theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/chat" element={<Chat unselected />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
