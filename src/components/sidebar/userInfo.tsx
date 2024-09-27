import { useAuthStore } from "@/store/auth";
import { Avatars } from "../avatars";
import { ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { genders } from "@/mock/genders";
import { ConfirmButton } from "../ui/confirmButton";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { delLocalStorage } from "@/lib/utils";
import { useModalStore } from "@/store/modal";

export const UserInfo = () => {
  const { user, setIsAuthenticated, setUser } = useAuthStore();
  const { mutate: logout } = useLogout();
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const onLogout = () => {
    logout(null, {
      onSettled: () => {
        delLocalStorage("accessToken", "refreshToken");
        closeModal("userinfo", "logout");
        setIsAuthenticated(false);
        setUser(null);
        toast.success("Вы успешно вышли из аккаунта");
        navigate("/");
      },
    });
  };

  if (!user) return null;

  return (
    <>
      <ModalHeader>
        <h2>Информация о пользователе</h2>
      </ModalHeader>
      <ModalContent className="flex gap-4">
        <Avatars className="w-14 h-14" index={user.avatar} />
        <span>
          <p>Никнейм: {user.username}</p>
          <p>Пол: {genders[user.gender]}</p>
        </span>
      </ModalContent>
      <ModalFooter>
        <ConfirmButton
          modalName="logout"
          confirmText="Вы точно хотите выйти из аккаунта?"
          variant="destructive"
          className="w-full"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </ConfirmButton>
      </ModalFooter>
    </>
  );
};
