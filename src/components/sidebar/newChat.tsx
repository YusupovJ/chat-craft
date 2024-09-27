import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ModalContent, ModalFooter, ModalHeader } from "../ui/modal";
import { useChatCreate } from "@/hooks/useChat";
import { useModalStore } from "@/store/modal";
import { useQueryClient } from "react-query";
import { CHAT_KEY } from "@/lib/constants";

export const NewChat = () => {
  const [name, setName] = useState<string>("");
  const { closeModal } = useModalStore();
  const { mutate } = useChatCreate();
  const queryClient = useQueryClient();

  const createChat = () => {
    mutate(
      { name },
      {
        onSuccess: () => {
          toast.success("Группа успешно создана");
          closeModal("newchat");
          queryClient.refetchQueries(CHAT_KEY);
        },
        onError: () => {
          toast.error("Введите имя для группы");
        },
      }
    );
  };

  return (
    <>
      <ModalHeader>
        <h2>Создать группу</h2>
      </ModalHeader>

      <ModalContent className="flex flex-col gap-6">
        <Input placeholder="Имя группы" onChange={(e) => setName(e.target.value)} value={name} />
      </ModalContent>

      <ModalFooter>
        <Button onClick={createChat}>Создать</Button>
      </ModalFooter>
    </>
  );
};
