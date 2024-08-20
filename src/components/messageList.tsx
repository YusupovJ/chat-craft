import { Dispatch, FC, SetStateAction, useEffect } from "react";
import Avatars from "./avatars";
import { cn } from "@/lib/utils";
import Message from "./message";
import { IMessage } from "@/types";
import { useAuthStore } from "@/store/auth";

interface Props {
  messages: IMessage[];
  className?: string;
  setPage?: Dispatch<SetStateAction<number>>;
}

const MessageList: FC<Props> = ({ messages, className, setPage }) => {
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        const firstEl = document.getElementById("first-message");

        if (firstEl && setPage) {
          setPage((page) => page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn("flex flex-col gap-10 sm:gap-6 py-2 px-4 bg-gray-300", className)}>
      {messages.map((message, index) => {
        const isMe = user?.id === message.user.id;

        return (
          <div
            className={cn("flex gap-3 sm:gap-6 items-end", isMe && "flex-row-reverse")}
            key={message.id}
            id={index === 0 ? "first-message" : undefined}
          >
            <Avatars index={message.user.avatar} />
            <Message isMe={isMe} message={message} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
