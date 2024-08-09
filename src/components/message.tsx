import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  isMe?: boolean;
}

const Message: FC<Props> = ({ className, children, isMe }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-3 text-[14px] font-medium shadow-md shadow-gray-300",
        isMe ? "rounded-br-none" : "rounded-bl-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Message;
