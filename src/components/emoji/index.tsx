import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EmojiMenu } from "./emoji";
import { StikerMenu } from "./stiker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: (sendMessage: string) => void;
}

export const StickerEmojiMenu: FC<Props> = ({ setContent, sendMessage }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[30px] min-w-[30px] border-2">
          {":)"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Tabs defaultValue="emoji">
          <TabsList className="w-full">
            <TabsTrigger value="emoji" className="grow">
              Смайлики
            </TabsTrigger>
            <TabsTrigger value="sticker" className="grow">
              Стикеры
            </TabsTrigger>
          </TabsList>
          <TabsContent value="emoji" className="h-[500px] max-w-[500px] overflow-auto">
            <EmojiMenu setContent={setContent} />
          </TabsContent>
          <TabsContent value="sticker" className="h-[500px] max-w-[500px] overflow-auto">
            <StikerMenu sendMessage={sendMessage} />
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
