import { FC, ReactNode, useEffect } from "react";
import { useAuthStore } from "./auth";
import { api } from "@/lib/api";
import { IMe } from "@/types";
import { urls } from "@/lib/urls";
import { getLocalStorage } from "@/lib/utils";

interface Props {
  children?: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const { setIsAuthenticated, setUser, isAuthenticated } = useAuthStore();
  const accessToken = getLocalStorage("accessToken");

  useEffect(() => {
    if (accessToken) {
      api
        .get<IMe>(urls.auth.me)
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
          setUser(null);
        });

      return;
    }

    setIsAuthenticated(false);
  }, [accessToken, isAuthenticated]);

  return children;
};

export default AuthProvider;
