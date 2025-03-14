import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "@/store/authProvider";
import { ThemeProvider } from "@/store/themeProvider";
import { ModalProvider } from "@/store/modalProvider";
import { routes } from "./mock/routes";
import { Suspense } from "react";
import { Loader } from "./components/loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
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
                {routes.map((route) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
                  />
                ))}
              </Routes>
            </AuthProvider>
          </ModalProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
