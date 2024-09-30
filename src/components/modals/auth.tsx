import { useState } from "react";
import { ModalContent, ModalHeader } from "../ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "../auth/loginForm";
import { RegisterForm } from "../auth/registerForm";

const Auth = () => {
  const [value, setValue] = useState("login");

  return (
    <Tabs defaultValue="login" onValueChange={setValue}>
      <TabsList className="w-full">
        <TabsTrigger value="login" className="grow">
          Логин
        </TabsTrigger>
        <TabsTrigger value="register" className="grow">
          Регистрция
        </TabsTrigger>
      </TabsList>
      <ModalHeader>
        <h2>{value === "login" ? "Логин" : "Регистрация"}</h2>
      </ModalHeader>
      <ModalContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </ModalContent>
    </Tabs>
  );
};

export default Auth;
