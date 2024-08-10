import { FC } from "react";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

interface Props {
  className?: string;
}

const ChatInfo: FC<Props> = () => {
  const shareLink = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);

      console.log("text copied");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed flex bg-primary justify-between items-center py-2 top-0 left-0 w-full px-4 shadow-md shadow-gray-500">
      <h2 className="font-bold text-white">GroupName</h2>
      <Button variant="outline" className="font-bold flex gap-2 p-2" onClick={shareLink}>
        <p className="hidden md:block">Пригласить</p> <Share2 size="20" />
      </Button>
    </div>
  );
};

export default ChatInfo;
