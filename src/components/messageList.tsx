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
          <div className={cn("flex gap-3 sm:gap-6 items-center", isMe && "flex-row-reverse")} key={message.id}>
            <Avatars index={message.user.avatar} />

            <Message isMe={isMe}>
              <p className="text-[11px] lg:text-[13px] text-primary font-bold">{message.user.username}</p>{" "}
              {message.content}
            </Message>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
