import { stiker } from "@/mock/stiker";
import { IMessage } from "@/types";
import { FC } from "react";
import { MessageWrapper } from "./messageWrapper";

interface Props {
  className?: string;
  isMe?: boolean;
  message: IMessage;
}

export const Message: FC<Props> = ({ className, isMe, message }) => {
  return (
    <MessageWrapper message={message} isMe={isMe} className={className}>
      <p className="gap-2 flex flex-wrap">
        {message.content.split(" ").map((word, index) => {
          if (message.type === "sticker") {
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
    </MessageWrapper>
  );
};
