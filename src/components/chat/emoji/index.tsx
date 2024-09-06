import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmojiMenu } from "./emoji";
import { StikerMenu } from "./stiker";
import { useState } from "react";

export function MenuSmailik({ setContent, sendMessage }: any) {
  const [isEmoji, setEmaji] = useState<boolean>(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[30px] min-w-[30px] border-2">
          {":)"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center gap-3">
          <DropdownMenuLabel onClick={() => setEmaji(true)} className="cursor-pointer">
            Смайлики
          </DropdownMenuLabel>
          <DropdownMenuLabel onClick={() => setEmaji(false)} className="cursor-pointer">
            стикеры
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <div className="h-[500px] max-w-[500px] overflow-auto">
          {isEmoji ? <EmojiMenu setContent={setContent} /> : <StikerMenu sendMessage={sendMessage} />}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
