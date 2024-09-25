import { avatarList } from "@/mock/avatarList";
import { Avatars } from "./avatars";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onChange: (...event: any[]) => void;
  value: number;
}

export const SelectAva: FC<Props> = ({ onChange, value }) => {
  console.log(value);

  return (
    <div className="flex justify-between items-center">
      {avatarList.map((_, avatar) => (
        <span key={avatar} onClick={() => onChange({ target: { value: avatar.toString() } })}>
          <Avatars
            index={avatar}
            className={cn(
              +value === avatar ? "shadow-green-600  shadow-lg transform: scale-125" : "",
              "cursor-pointer transition-all"
            )}
          />
        </span>
      ))}
    </div>
  );
};
