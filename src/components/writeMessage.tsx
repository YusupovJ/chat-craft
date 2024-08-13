import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

interface IProps {
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
}

const socket = io(import.meta.env.VITE_BASEURL);

const WriteMessage: FC<IProps> = ({ setMessages }) => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const userId = useAuthStore((state) => state.id);

  useEffect(() => {
    socket.emit("join", id);

    socket.on("reply", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("reply");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", {
      chatId: id,
      userId: userId,
      content,
    });
  };

  return (
    <div className="fixed flex bg-white py-2 bottom-0 left-0 w-full px-2">
      <Input
        placeholder="Сообщение"
        className="rounded-none"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <Button className="rounded-none flex gap-2 items-center" onClick={sendMessage} aria-label="Отправить сообщение">
        <p className="hidden md:block">Отправить сообщение</p> <Send />
      </Button>
    </div>
  );
};

export default WriteMessage;
