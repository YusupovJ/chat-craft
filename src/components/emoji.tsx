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
    "(^ ω ^)",
    "(´ ∀ `)",
    "٩(◕‿◕｡)۶",
    "(o^▽^o)",
    "(⌒▽⌒)☆",
    "<(￣︶￣)>",
    "ヽ(・∀・)ﾉ",
    "(´｡• ω •｡`)",
    "(￣ω￣)",
    "(o･ω･o)",
    "(＠＾◡＾)",
    "ヽ(*・ω・)ﾉ",
    "(^人^)",
    "(o´▽`o)",
    "(*´▽`*)",
    "｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡",
    "(´ ω `)",
    "(o(*°▽°*)o)",
    "(≧◡≦)",
    "(o´∀`o)",
    "(´• ω •`)",
    "(＾▽＾)",
    "(⌒ω⌒)",
    "∑d(°∀°d)",
    "╰(▔∀▔)╯",
    "(─‿‿─)",
    "(*^‿^*)",
    "ヽ(o^ ^o)ﾉ",
    "(✯◡✯)",
    "(◕‿◕)",
    "(*≧ω≦*)",
    "(☆▽☆)",
    "(⌒‿⌒)",
    "ヽ(o＾▽＾o)ノ",
    "☆ ～('▽^人)",
    "(*°▽°*)",
    "٩(｡•́‿•̀｡)۶",
    "(✧ω✧)",
    "ヽ(*⌒▽⌒*)ﾉ",
    "(´｡• ᵕ •｡`)",
    "( ´ ▽ ` )",
    "(￣▽￣)",
    "╰(*´︶`*)╯",
    "ヽ(>∀<☆)ノ",
    "o(≧▽≦)o",
    "(☆ω☆)",
    "(っ˘ω˘ς )",
    "＼(￣▽￣)／",
    "(*¯︶¯*)",
    "＼(＾▽＾)／",
    "٩(◕‿◕)۶",
    "(o˘◡˘o)",
    "\\(★ω★)/",
    "\\(^ヮ^)/",
    "(〃＾▽＾〃)",
    "(╯✧▽✧)╯",
    "o(>ω<)o",
    "o(❛ᴗ❛)o",
    "｡ﾟ(TヮT)ﾟ｡",
    "(‾́ ◡ ‾́ )",
    "(ﾉ´ヮ`)ﾉ*: ･ﾟ",
    "(b ᵔ▽ᵔ)b",
    "(๑˃ᴗ˂)ﻭ",
    "(๑˘︶˘๑)",
    "◝(⁰▿⁰)◜",
    "(･ᴗ･)",
    "(ﾉ◕ヮ◕)ﾉ",
    "(„• ֊ •„)",
    "(.❛ ᴗ ❛.)",
    "(⁀ᗢ⁀)",
    "(￢‿￢)",
    "(¬‿¬ )",
    "(*￣▽￣)b",
    "(˙▿˙)",
    "(¯▿¯)",
    "( ◕▿◕ )",
    "＼(٥⁀▽⁀ )／",
    "(„• ᴗ •„)",
    "(ᵔ◡ᵔ)",
    "(๑>◡<๑)",
    "(= ⩊ =)",
    "⸜(´ ꒳ `)⸝",
    "⸜(⸝⸝⸝´꒳`⸝⸝⸝)⸝",
    "⸜(*ˊᗜˋ*)⸝",
    "⸜(*ˊᵕˋ*)⸝",
  ];

  const selectEmoji = (emoji: string) => {
    setContent((el) => (el += emoji));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[30px] min-w-[30px] border-2 border-gray-300">
          :)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[500px] overflow-auto">
        <DropdownMenuLabel>Смайлики</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup className="grid grid-cols-4 gap-4">
          {emojiList.map((emoji) => (
            <DropdownMenuRadioItem
              onClick={() => selectEmoji(emoji)}
              key={emoji}
              className="hover:bg-gray-100 py-3 cursor-pointer"
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
