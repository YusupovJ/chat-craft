import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { EmojiDropdownMenu } from "./emoji";
import { IMessage } from "@/types";

interface IProps {
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  messages: IMessage[];
  page: number;
  setAllowScroll: Dispatch<SetStateAction<boolean>>;
  allowScroll: boolean;
}

const socket = io(import.meta.env.VITE_BASEURL);

const WriteMessage: FC<IProps> = ({ setMessages, messages, page, setAllowScroll, allowScroll }) => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const userId = useAuthStore((state) => state.user?.id);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.emit("joinRoom", { chatId: id, userId });

    socket.on("reply", (msg) => {
      allowScrollOnReply(msg.user.id === userId);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("reply");
      socket.emit("leaveRoom", { chatId: id });
    };
  }, [socket, id, userId]);

  useEffect(() => {
    const dom = document.documentElement;
    const toBottomOnReload = !dom.getBoundingClientRect().y;

    if (toBottomOnReload) {
      window.scrollTo({
        top: dom.getBoundingClientRect().height / page - 72,
        behavior: "instant",
      });
      return;
    }

    scrollOnReply();
  }, [messages]);

  const scrollOnReply = () => {
    if (allowScroll) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      setAllowScroll(false);
    }
  };

  const allowScrollOnReply = (isMe?: boolean) => {
    const isAtBottom = document.documentElement.scrollHeight <= window.innerHeight + window.scrollY + 10;

    if (isAtBottom || isMe) {
      setAllowScroll(true);
    } else {
      setAllowScroll(false);
    }
  };

  const sendMessage = () => {
    if (content && content.trim()) {
      socket.emit("message", {
        chatId: id,
        userId: userId,
        content,
      });

      setContent("");
      if (inputRef.current) inputRef.current.focus();
    }
  };

  return (
    <div className="fixed flex bg-white py-2 bottom-0 left-0 w-full px-2 space-x-2">
      <Input
        placeholder="Сообщение"
        ref={inputRef}
        type="search"
        id="input-message"
        autoComplete="off"
        className="rounded-none border-2 border-gray-300"
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            sendMessage();
          }
        }}
        value={content}
      />
      <EmojiDropdownMenu setContent={setContent} />
      <Button
        className="rounded-none flex gap-2 items-center left-scroll"
        onClick={sendMessage}
        aria-label="Отправить сообщение"
      >
        <p className="hidden md:block">Отправить сообщение</p> <Send />
      </Button>
    </div>
  );
};

export default WriteMessage;
