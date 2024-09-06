import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { stiker } from "@/lib/stiker";

interface IEmojiProps {
  sendMessage: (sendMessage: string) => void;
}

export function StikerMenu({ sendMessage }: IEmojiProps) {
  const selectStiker = (stiker: number) => {
    sendMessage("@" + (stiker - 1));
  };

  return (
    <DropdownMenuRadioGroup className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {stiker.map((stiker) => (
        <DropdownMenuRadioItem
          onClick={() => selectStiker(stiker.id)}
          key={stiker.id}
          className="hover:bg-gray-100 p-0 py-3 px-2 cursor-pointer flex justify-center overflow-hidden"
          value="top"
        >
          <img src={stiker.url} className="max-w-40 h-full" alt="stiker" />
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}
