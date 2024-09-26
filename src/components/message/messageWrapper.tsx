import { cn, getFormattedTime } from "@/lib/utils";
import { IMessage } from "@/types";
import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  isMe?: boolean;
  message: IMessage;
  children?: ReactNode;
}

export const MessageWrapper: FC<Props> = ({ isMe, className, message, children }) => {
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
      {children}
      <p className={`text-[9px] lg:text-[11px] text-primary mt-2 font-light ${!isMe && "text-end"}`}>
        {getFormattedTime(message.created_at)}
      </p>
    </div>
  );
};
