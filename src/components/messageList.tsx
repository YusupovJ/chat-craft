import { FC } from "react";
import Avatars from "./avatars";
import { cn } from "@/lib/utils";
import Message from "./message";
import { IMessage, IUser } from "@/types";

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
              <p className={`text-[11px] lg:text-[13px] text-primary font-boldis ${isMe && "text-end"}`}>
                {message.user.username}
              </p>{" "}
              {message.content}
              <p className={`text-[9px] lg:text-[11px] text-primary font-light ${!isMe && "text-end"}`}>
                {new Date(message.created_at as string).toLocaleDateString()}
              </p>{" "}
            </Message>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
