import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useNavigate } from "react-router-dom";
import { IChat } from "@/types";
import { ModalContent, ModalFooter, ModalHeader } from "./ui/modal";

const NewChat = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const createChat = async () => {
    if (name) {
      try {
        const res = await api.post<IChat>(urls.chat.create, { name });
        navigate(`/chat/${res.data.id}`);
      } catch (error) {
        console.log(error);
        toast.error("Что то пошло не так");
      }

      return;
    }

    toast.error("Введите имя для группы");
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

export default NewChat;
