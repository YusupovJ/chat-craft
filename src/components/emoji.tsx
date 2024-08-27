import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { emojiList } from "@/lib/emojis";
import { Dispatch, SetStateAction } from "react";

interface IEmojiProps {
  setContent: Dispatch<SetStateAction<string>>;
}

export function EmojiDropdownMenu({ setContent }: IEmojiProps) {
  const selectEmoji = (emoji: string) => {
    setContent((el) => (el += emoji));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[30px] min-w-[30px] border-2">
          :)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[500px] overflow-auto">
        <DropdownMenuLabel>Смайлики</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
