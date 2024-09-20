import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Chat } from "./pages/chat";
import { Home } from "./pages/home";
import { NotFound } from "./pages/notFound";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "@/store/authProvider";
import { ThemeProvider } from "@/store/themeProvider";
import { ModalProvider } from "@/store/modalProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light">
          <Toaster closeButton richColors toastOptions={{ duration: 3000 }} />
          <ModalProvider>
            <AuthProvider>
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
