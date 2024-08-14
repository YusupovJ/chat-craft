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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IEmojiProps {
  setContent: Dispatch<SetStateAction<string>>;
}

export function EmojiDropdownMenu({ setContent }: IEmojiProps) {
  const [indexEmoji, setIndexEmoji] = useState(0);

  const emojiList = [
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

  useEffect(() => {
    setInterval(() => {
      setIndexEmoji(Math.round(Math.random() * emojiList.length));
    }, 3000);
  }, []);

  const selectEmoji = (emoji: string) => {
    setContent((el) => (el += emoji));
    const input: HTMLInputElement | null = document.querySelector("#input-message");

    if (input) {
      input.focus();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[60px] min-w-[60px] border-2 border-gray-300">
          {emojiList[indexEmoji]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Смайлики</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup className="grid grid-cols-5 gap-4">
          {emojiList.map((emoji) => (
            <DropdownMenuRadioItem
              onClick={() => selectEmoji(emoji)}
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
