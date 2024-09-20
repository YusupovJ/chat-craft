import { useAuthStore } from "@/store/auth";
import { Avatars } from "../avatars";
import { ModalContent, ModalHeader } from "../ui/modal";
import { genders } from "@/mock/genders";

export const UserInfo = () => {
  const { user } = useAuthStore();

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
    </>
  );
};
