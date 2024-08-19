import { Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Home from "./home";
import { Toaster } from "./ui/sonner";
import AuthProvider from "@/store/authProvider";

const App = () => {
  return (
    <AuthProvider>
      <Toaster closeButton richColors theme="light" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
