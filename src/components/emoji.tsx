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
  let [indexEmoji, setIndexEmoji] = useState(0);

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

  useEffect(() => {
    setInterval(() => {
      setIndexEmoji(Math.round(Math.random() * emoji.length));
    }, 3000);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[60px] min-w-[60px] border-2 border-gray-300">
          {emoji[indexEmoji]}
        </Button>
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
