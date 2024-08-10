import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const WriteMessage = () => {
  return (
    <div className="fixed flex bg-white py-2 bottom-0 left-0 w-full px-2">
      <Input placeholder="Сообщение" className="rounded-none" />
      <Button className="rounded-none flex gap-2 items-center" aria-label="Отправить сообщение">
        <p className="hidden md:block">Отправить сообщение</p> <Send />
      </Button>
    </div>
  );
};

export default WriteMessage;
