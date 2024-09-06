import { Dispatch, FC, SetStateAction } from "react";
import Avatars from "../avatars";
import { cn } from "@/lib/utils";
import Message from "./message";
import { IMessage } from "@/types";
import { useAuthStore } from "@/store/auth";

interface Props {
  messages: IMessage[];
  className?: string;
  setPage?: Dispatch<SetStateAction<number>>;
}

const MessageList: FC<Props> = ({ messages, className }) => {
  const { user } = useAuthStore();

  return (
    <div className={cn("flex flex-col gap-10 sm:gap-6 py-2 px-4 bg-muted", className)}>
      {messages.map((message, index) => {
        const isMe = user?.id === message.user.id;

        return (
          <div
            className={cn("flex gap-3 sm:gap-6 items-end", isMe && "flex-row-reverse")}
            data-index={index}
            key={message.id}
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
