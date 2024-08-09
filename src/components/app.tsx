import { Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Home from "./home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
