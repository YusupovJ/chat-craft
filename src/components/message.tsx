import { stiker } from "@/lib/stiker";
import { cn, localeDate } from "@/lib/utils";
import { IMessage } from "@/types";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  isMe?: boolean;
  message: IMessage;
}

const sticketRegExp = /^@[0-9]$|^@1[0-9]$|^@19$/;

const genLink = (word: string) => {
  return (
    <a href={word} target="_blank" className="text-blue-500 underline">
      {word}
    </a>
  );
};

const Message: FC<Props> = ({ className, isMe, message }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-3 text-[14px] font-medium shadow-md shadow-gray-300 max-w-[700px]",
        isMe ? "rounded-br-none" : "rounded-bl-none",
        className
      )}
    >
      <p className={cn("text-[11px] lg:text-[13px] text-primary font-boldis", isMe && "text-end")}>
        {message.user.username}
      </p>
      <p className="gap-2 flex flex-wrap">
        {message.content.split(" ").map((word) => {
          if (sticketRegExp.test(word)) {
            return <img src={stiker[+message.content.slice(1, 3)].url} className="block m-auto" alt="stiker" />;
          }

          const isUrl = word.startsWith("https://") || word.startsWith("http://");
          if (isUrl) return genLink(word);

          return <span>{word}</span>;
        })}
      </p>
      <p className={`text-[9px] lg:text-[11px] text-primary font-light ${!isMe && "text-end"}`}>
        {localeDate(message.created_at)}
      </p>
    </div>
  );
};

export default Message;
