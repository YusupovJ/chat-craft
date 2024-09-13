import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Avatars from "./avatars";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { cn, setLocalStorage } from "@/lib/utils";
import { ModalContent, ModalFooter, ModalHeader } from "./ui/modal";
import { useModalStore } from "@/store/modal";
import { useSignIn, useSignUp } from "@/hooks/useAuth";
import { onError } from "@/lib/onError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(2);
  const [gender, setGender] = useState<string>("steve");
  const [auth, setAuth] = useState("login");
  const { setIsAuthenticated } = useAuthStore();
  const { closeModal } = useModalStore();
  const { mutate: signIn } = useSignIn();
  const { mutate: signUp } = useSignUp();

  const handlerLogin = async () => {
    if (name && password) {
      const values = { username: name, password };

      signIn(values, {
        onSuccess: (data) => {
          setLocalStorage("accessToken", data.accessToken);
          setLocalStorage("refreshToken", data.refreshToken);

          setIsAuthenticated(true);
          closeModal("auth");
          toast.success(`Вы успешно вошли в свой аккаунт`);
        },
        onError,
      });
    }
  };

  const handlerSignUp = async () => {
    if (name && password) {
      const values = { username: name, password, avatar, gender };
      signUp(values, {
        onSuccess: (data) => {
          setLocalStorage("accessToken", data.accessToken);
          setLocalStorage("refreshToken", data.refreshToken);

          setIsAuthenticated(true);
          closeModal("auth");
          toast.success(`Вы успешно зарегистрировались`);
        },
        onError,
      });
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
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              {avatarArray.map((el) => (
                <span key={el} onClick={() => setAvatar(el)}>
                  <Avatars
                    index={el}
                    className={cn(
                      avatar === el ? "shadow-green-600  shadow-lg transform: scale-150" : "",
                      "cursor-pointer transition-all"
                    )}
                  />
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Стив" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="man">Мужчина</SelectItem>
                  <SelectItem value="girl">Женщина</SelectItem>
                  <SelectItem value="steve">Стив</SelectItem>
                  <SelectItem value="croissant">Круассан</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
        <Button onClick={auth === "signin" ? handlerSignUp : handlerLogin} type="button" variant="default">
          {auth === "signin" ? "Зарегистрироваться" : "Войти"}
        </Button>
      </ModalFooter>
    </>
  );
}

export default Login;
