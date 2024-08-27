import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import Avatars from "./avatars";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { setLocalStorage } from "@/lib/utils";
import { ITokens } from "@/types";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarIndex] = useState(2);
  const [auth, setAuth] = useState("login");
  const { setIsAuthenticated } = useAuthStore();

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden lg:flex py-0 gap-2">
          <LogInIcon />
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{auth === "signin" ? "Создать" : "Войти"}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">eee</DialogDescription>
        <div className="grid flex-1 gap-2">
          <Input type="text" onChange={(e) => setName(e.target.value)} placeholder="Имя" />
        </div>
        <div className="grid flex-1 gap-2">
          <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        </div>
        <div className={`${auth === "signin" ? "flex" : "hidden"} justify-between items-center`}>
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
        <DialogFooter className="items-center">
          <p className="text-sm mr-2 mt-3 sm:mt-0">
            <span
              className="text-green-500 hover:underline cursor-pointer"
              onClick={() => (auth === "signin" ? setAuth("login") : setAuth("signin"))}
            >
              {auth === "signin" ? "Войти в" : "Создать"}
            </span>{" "}
            аккаунт
          </p>
          <DialogClose asChild>
            <Button
              onClick={() => [auth === "signin" ? handlerSignUp() : handlerLogin()]}
              type="button"
              variant="default"
            >
              {auth === "signin" ? "Зарегистрироваться" : "Войти"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
