import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuRadioGroupDemo({ name }: { name: string | undefined }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white font-bold text-md border-2 border-white">
          {name || "user"}
          <span className="rotate-90 px-1 py-2">{">"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0">
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem
            value=""
            className="bg-red-600 focus:bg-red-500 focus:text-gray-50 cursor-pointer text-white"
          >
            logout
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
