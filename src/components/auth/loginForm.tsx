import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/loginSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ILoginData } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModalStore } from "@/store/modal";
import { useSignIn } from "@/hooks/useAuth";
import { setLocalStorage } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { onError } from "@/lib/onError";

export const LoginForm = () => {
  const { closeModal } = useModalStore();
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const { mutate: signIn } = useSignIn();
  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = (values: ILoginData) => {
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder="Введите пароль" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex mt-6 justify-between">
          <Button onClick={() => closeModal("auth")} variant="secondary">
            Закрыть
          </Button>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </Form>
  );
};
