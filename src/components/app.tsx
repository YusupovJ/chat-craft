import { Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Home from "./home";
import { Toaster } from "./ui/sonner";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
