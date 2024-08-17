import { FC } from "react";
import Avatars from "./avatars";
import { cn } from "@/lib/utils";
import Message from "./message";
import { IMessage, IUser } from "@/types";

interface Props {
  messages: IMessage[];
  me: IUser;
}

const localeDate = (date: string) => {
  const hours = new Date(date).getHours();
  const minute = new Date(date).getMinutes();
  return `${hours}:${minute}`;
};

const MessageList: FC<Props> = ({ messages, me }) => {
  return (
    <div className="flex flex-col gap-10 sm:gap-6 mb-6 mt-16">
      {messages.map((message) => {
        const isMe = me.id === message.user.id;

        const isUrl = (msg: string) => {
          if (msg.includes("http://") || msg.includes("https://")) {
            return { content: msg, url: true };
          }
          return { content: msg, url: false };
        };

        return (
          <div className={cn("flex gap-3 sm:gap-6 items-end", isMe && "flex-row-reverse")} key={message.id}>
            <Avatars index={message.user.avatar} />

            <Message isMe={isMe}>
              <p className={`text-[11px] lg:text-[13px] text-primary font-boldis ${isMe && "text-end"}`}>
                {message.user.username}
              </p>{" "}
              <p
                className={`${
                  isUrl(message.content).url && "underline hover:no-underline cursor-pointer text-blue-500"
                }`}
              >
                {isUrl(message.content).url ? (
                  <a href={isUrl(message.content).content} target="_blank">
                    {isUrl(message.content).content}
                  </a>
                ) : (
                  isUrl(message.content).content
                )}
              </p>
              <p className={`text-[9px] lg:text-[11px] text-primary font-light ${!isMe && "text-end"}`}>
                {localeDate(message.created_at)}
              </p>
            </Message>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
