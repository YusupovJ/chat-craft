import { Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Home from "./home";
import { Toaster } from "./ui/sonner";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { urls } from "@/lib/urls";
import { api } from "@/lib/api";
import { getToken } from "@/lib/tokens";
import { IMe } from "@/types";

const App = () => {
  const updateUser = useAuthStore((state) => state.updateUser);
  const updateAvatar = useAuthStore((state) => state.updateAvatar);
  const updateId = useAuthStore((state) => state.updateId);
  const updateAccessToken = useAuthStore((state) => state.updateAccessToken);
  const updateRefreshToken = useAuthStore((state) => state.updateRefreshToken);
  const accessToken = useAuthStore((state) => state.accessToken);
  const access = getToken("accessToken");
  const refresh = getToken("refreshToken");

  useEffect(() => {
    if (accessToken || access) {
      api
        .get<IMe>(`${urls.auth.me}`)
        .then((res) => [
          updateUser(res.data.username),
          updateAvatar(res.data.avatar),
          updateId(res.data.id),
          updateAccessToken(access || undefined),
          updateRefreshToken(refresh || undefined),
        ])
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken]);

  return (
    <>
      <Toaster closeButton richColors theme="light" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
