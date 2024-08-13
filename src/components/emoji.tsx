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
import { Dispatch, SetStateAction } from "react";

interface IEmojiProps {
  setContent: Dispatch<SetStateAction<string>>;
}

export function EmojiDropdownMenu({ setContent }: IEmojiProps) {
  const emoji = [
    ":/",
    ":>",
    ":D",
    ":P",
    ":|",
    ":O",
    ":S",
    ":-)",
    ":-(",
    ":-/",
    ":-D",
    ":-P",
    ":-|",
    ":-O",
    ":-S",
    ":^)",
    ":)",
    ":(",
    ":]",
    ":3",
    ":<",
    ">:(",
    ">:)",
    ">:D",
    ">:P",
    ">:/",
    ">:-/",
    ">:-)",
    ">:-(",
    ">:-D",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{":D"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>смайлики</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup className="grid grid-cols-5 gap-4">
          {emoji.map((emoji) => (
            <DropdownMenuRadioItem
              onClick={() => setContent((el) => (el += emoji))}
              key={emoji}
              className="hover:bg-gray-100 py-3 px-auto cursor-pointer"
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
