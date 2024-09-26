import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { useSend } from "@/hooks/useSend";
import { stiker } from "@/mock/stiker";

export const StikerMenu = () => {
  const { sendMessage } = useSend();

  const selectStiker = (stiker: number) => {
    sendMessage("@" + (stiker - 1), "sticker");
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
          <img src={stiker.url} className="max-w-28 lg:max-w-40 max-h-[150px] h-full w-full" alt="stiker" />
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
};
