import { FC } from "react";
import { cn } from "@/lib/utils";
import { avatarList } from "@/mock/avatarList";

interface Props {
  index: number;
  className?: string;
}

export const Avatars: FC<Props> = ({ index, className }) => {
  return (
    <img
      src={avatarList[index]}
      className={cn("w-8 h-8 shadow-md shadow-muted", className)}
      alt={`Avatar ${index + 1}`}
    />
  );
};
