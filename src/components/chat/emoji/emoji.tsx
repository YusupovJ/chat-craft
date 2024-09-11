import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { emojiList } from "@/lib/emojis";
import { Dispatch, SetStateAction } from "react";

interface IEmojiProps {
  setContent: Dispatch<SetStateAction<string>>;
}

export function EmojiMenu({ setContent }: IEmojiProps) {
  const selectEmoji = (emoji: string) => {
    setContent((el) => (el += emoji));
  };

  return (
    <DropdownMenuRadioGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {emojiList.map((emoji) => (
        <DropdownMenuRadioItem
          onClick={() => selectEmoji(emoji)}
          key={emoji}
          className="hover:bg-gray-100 p-0 py-3 px-2 cursor-pointer flex justify-center"
          value="top"
        >
          {emoji}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}
