import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import { cn } from "@/lib/utils";
import { FC } from "react";

const avatarList = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

interface Props {
  index: number;
  className?: string;
}

const Avatars: FC<Props> = ({ index, className }) => {
  return (
    <img
      src={avatarList[index]}
      className={cn("w-8 h-8 shadow-md shadow-muted", className)}
      alt={`Avatar ${index + 1}`}
    />
  );
};

export default Avatars;
