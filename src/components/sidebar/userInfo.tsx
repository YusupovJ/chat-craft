import { useAuthStore } from "@/store/auth";
import Avatars from "../avatars";
import { ModalContent, ModalHeader } from "../ui/modal";

const UserInfo = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <>
      <ModalHeader>
        <h2>Информация о пользователе</h2>
      </ModalHeader>
      <ModalContent>
        <Avatars index={user.avatar} />
        <p>{user.username}</p>
      </ModalContent>
    </>
  );
};

export default UserInfo;
