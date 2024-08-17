import { FC } from "react";
import Avatars from "./avatars";
import { cn } from "@/lib/utils";
import Message from "./message";
import { IMessage, IUser } from "@/types";
import { stiker } from "./stiker";

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

        return (
          <div className={cn("flex gap-3 sm:gap-6 items-end", isMe && "flex-row-reverse")} key={message.id}>
            <Avatars index={message.user.avatar} />

            <Message isMe={isMe}>
              <p className={`text-[11px] lg:text-[13px] text-primary font-boldis ${isMe && "text-end"}`}>
                {message.user.username}
              </p>{" "}
              <p className="gap-2 flex flex-wrap">
                {message.content.split(" ").map((word) => {
                  const isUrl = word.startsWith("https://") || word.startsWith("http://");

                  if (/^@[0-9]$|^@1[0-9]$|^@19$/.test(word)) {
                    return (
                      <img src={`${stiker[+message.content.slice(1, 3)].url}`} className="block m-auto" alt="stiker" />
                    );
                  }

                  if (isUrl)
                    return (
                      <a href={word} target="_blank" className="text-blue-500 underline">
                        {word}
                      </a>
                    );

                  return <span>{word}</span>;
                })}
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
