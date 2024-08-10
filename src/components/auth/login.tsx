import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useState } from "react";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handlerLogin = () => {
    api
      .post(`${urls.auth.login}`, { name, password })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Войти</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Войти</DialogTitle>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Input type="text" onChange={(e) => setName(e.target.value)} placeholder="имя" />
        </div>
        <div className="grid flex-1 gap-2">
          <Input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="пароль" />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="ml-auto" onClick={() => handlerLogin()} type="button" variant="default">
              вайти
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default Login;
