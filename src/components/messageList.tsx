import { FC } from "react";
import Avatars from "./avatars";
import { cn } from "@/lib/utils";
import Message from "./message";

interface Props {
  messages: IMessage[];
  me: IUser;
}

const MessageList: FC<Props> = ({ messages, me }) => {
  return (
    <div className="flex flex-col gap-10 sm:gap-6 mb-6 mt-16">
      {messages.map((message) => {
        const isMe = me.id === message.user.id;

        return (
          <div className={cn("flex gap-3 sm:gap-6 items-end", isMe && "flex-row-reverse")} key={message.id}>
            <Avatars index={message.user.avatar} /> <Message isMe={isMe}>{message.content}</Message>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
