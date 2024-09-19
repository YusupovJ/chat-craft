import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat";
import Home from "./pages/home";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "@/store/authProvider";
import ThemeProvider from "@/store/themeProvider";
import { useThemeStore } from "@/store/theme";
import ModalProvider from "@/store/modalProvider";
import NotFound from "./components/notFound";
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
      <BrowserRouter>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
