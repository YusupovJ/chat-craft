import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Avatars from "./avatars";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { setLocalStorage } from "@/lib/utils";
import { ITokens } from "@/types";
import { ModalContent, ModalFooter, ModalHeader } from "./ui/modal";
import { useModalStore } from "@/store/modal";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarIndex] = useState(2);
  const [auth, setAuth] = useState("login");
  const { setIsAuthenticated } = useAuthStore();
  const closeModal = useModalStore((state) => state.closeModal.bind(null, "auth"));

  const handlerLogin = async () => {
    if (name && password) {
      try {
        const { data } = await api.post<ITokens>(urls.auth.login, { username: name, password });

        setLocalStorage("accessToken", data.accessToken);
        setLocalStorage("refreshToken", data.refreshToken);

        setIsAuthenticated(true);
        toast.success(`Вы успешно вошли в свой аккаунт`);
      } catch (error) {
        console.log(error);
        toast.error("Пароль или логин неверны");
      }
    }
  };

  const handlerSignUp = async () => {
    if (name && password) {
      try {
        const { data } = await api.post<ITokens>(urls.auth.signup, { username: name, password, avatar });

        setIsAuthenticated(true);
        setLocalStorage("accessToken", data.accessToken);
        setLocalStorage("refreshToken", data.refreshToken);

        toast.success(`вы успешно зарегистрировались`);
      } catch (error: unknown) {
        console.log(error);
        toast.error("Пользователь уже существует");
      }
    }
  };

  const avatarArray = [0, 1, 2, 3, 4, 5, 6];

  return (
    <>
      <ModalHeader>
        <h2>{auth === "signin" ? "Создать" : "Войти"}</h2>
      </ModalHeader>

      <ModalContent className="gap-3 flex flex-col">
        <div className="grid flex-1 gap-2">
          <Input type="text" onChange={(e) => setName(e.target.value)} placeholder="Имя" />
        </div>
        <div className="grid flex-1 gap-2">
          <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        </div>

        {auth === "signin" && (
          <div className="flex justify-between items-center">
            {avatarArray.map((el) => (
              <span key={el} onClick={() => setAvatarIndex(el)}>
                <Avatars
                  index={el}
                  className={`${
                    avatar === el ? "shadow-green-600  shadow-lg transform: scale-150 transition-all" : ""
                  } cursor-pointer`}
                />
              </span>
            ))}
          </div>
        )}
      </ModalContent>

      <ModalFooter className="items-center gap-3">
        <p className="text-sm mr-2 mt-3 sm:mt-0">
          <span
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => (auth === "signin" ? setAuth("login") : setAuth("signin"))}
          >
            {auth === "signin" ? "Войти в" : "Создать"}
          </span>{" "}
          аккаунт
        </p>
        <Button
          onClick={() => [auth === "signin" ? handlerSignUp() : handlerLogin(), closeModal()]}
          type="button"
          variant="default"
        >
          {auth === "signin" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </ModalFooter>
    </>
  );
}

export default Login;
