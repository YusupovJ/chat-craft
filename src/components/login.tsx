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

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(2);
  const [auth, setAuth] = useState("login");

  const handlerLogin = () => {
    console.log("sign in", name, password);
  };

  const handlerSignUp = () => {
    console.log("sign up", name, password);
  };

  const avatarArray = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center bg-white cursor-pointer px-3 rounded-md">
          <LogInIcon />
          <Button variant="ghost">Войти</Button>
        </div>
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
          <Input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        </div>
        <div className={`${auth === "signin" ? "flex" : "hidden"} justify-between items-center`}>
          {avatarArray.map((el) => (
            <span key={el} onClick={() => setAvatarIndex(el)}>
              <Avatars
                index={el}
                className={`${
                  avatarIndex === el ? "shadow-green-600  shadow-lg transform: scale-150 transition-all" : ""
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
