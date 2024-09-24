import { registerSchema } from "@/validations/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { onError } from "@/lib/onError";
import { setLocalStorage } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useSignUp } from "@/hooks/useAuth";
import { useModalStore } from "@/store/modal";
import { IRegisterData } from "@/types";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { genders } from "@/mock/genders";

export const RegisterForm = () => {
  const form = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { mutate: signUp } = useSignUp();
  const { closeModal } = useModalStore();
  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = (values: IRegisterData) => {
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш пол</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange({
                        target: { value },
                      });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Стив" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(genders).map(([key, value]) => (
                        <SelectItem value={key} key={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex mt-6 justify-between">
          <Button onClick={() => closeModal("auth")} variant="secondary">
            Закрыть
          </Button>
          <Button type="submit">Зарегистрироваться</Button>
        </div>
      </form>
    </Form>
  );
};
