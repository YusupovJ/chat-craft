import { sticketRegExp, stiker } from "@/mock/stiker";
import { cn, getFormattedTime } from "@/lib/utils";
import { IMessage } from "@/types";
import { FC } from "react";

interface Props {
  className?: string;
  isMe?: boolean;
  message: IMessage;
}

export const Message: FC<Props> = ({ className, isMe, message }) => {
  return (
    <div
      className={cn(
        "bg-background rounded-lg p-3 text-[14px] font-medium shadow-md shadow-muted max-w-[700px]",
        isMe ? "rounded-br-none" : "rounded-bl-none",
        className
      )}
    >
      <p className={cn("text-[11px] lg:text-[13px] text-primary font-bold", isMe && "text-end")}>
        {message.user.username}
      </p>
      <p className="gap-2 flex flex-wrap">
        {message.content.split(" ").map((word, index) => {
          if (sticketRegExp.test(message.content)) {
            return (
              <img key={index} src={stiker[+word.slice(1, 3)].url} className="block m-auto w-96 h-96" alt="stiker" />
            );
          }

          const isUrl = word.startsWith("https://") || word.startsWith("http://");
          if (isUrl) {
            return (
              <a href={word} key={index} target="_blank" className="text-blue-500 underline break-all">
                {word}
              </a>
            );
          }

          return (
            <span key={index} className="break-all">
              {word}
            </span>
          );
        })}
      </p>

      <p className={`text-[9px] lg:text-[11px] text-primary mt-2 font-light ${!isMe && "text-end"}`}>
        {getFormattedTime(message.created_at)}
      </p>
    </div>
  );
};
