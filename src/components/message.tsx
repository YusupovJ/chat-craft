import { sticketRegExp, stiker } from "@/lib/stiker";
import { cn, localeDate } from "@/lib/utils";
import { IMessage } from "@/types";
import { FC } from "react";

interface Props {
  className?: string;
  isMe?: boolean;
  message: IMessage;
}

const genLink = (word: string, key: string | number) => {
  return (
    <a href={word} key={key} target="_blank" className="text-blue-500 underline">
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
      <p className={cn("text-[11px] lg:text-[13px] text-primary font-bold", isMe && "text-end")}>
        {message.user.username}
      </p>
      <p className="gap-2 flex flex-wrap">
        {message.content.split(" ").map((word, index) => {
          if (sticketRegExp.test(word)) {
            return (
              <img
                key={index}
                src={stiker[+message.content.slice(1, 3)].url}
                className="block m-auto w-96 h-96"
                alt="stiker"
              />
            );
          }

          const isUrl = word.startsWith("https://") || word.startsWith("http://");
          if (isUrl) return genLink(word, index);

          return <span key={index}>{word}</span>;
        })}
      </p>
      <p className={`text-[9px] lg:text-[11px] text-primary font-light ${!isMe && "text-end"}`}>
        {localeDate(message.created_at)}
      </p>
    </div>
  );
};

export default Message;
