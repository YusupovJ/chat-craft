import { FC } from "react";
import Avatars from "./avatars";
import { cn } from "@/lib/utils";
import Message from "./message";
import { IMessage, IMe } from "@/types";

interface Props {
  messages: IMessage[];
  me: IMe | null;
}

const MessageList: FC<Props> = ({ messages, me }) => {
  return (
    <div className="flex flex-col gap-10 sm:gap-6 min-h-[calc(100vh-72px-56px)] py-2 px-4">
      {messages.map((message) => {
        const isMe = me?.id === message.user.id;

        return (
          <div className={cn("flex gap-3 sm:gap-6 items-end", isMe && "flex-row-reverse")} key={message.id}>
            <Avatars index={message.user.avatar} />
            <Message isMe={isMe} message={message} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
