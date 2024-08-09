import { Button } from "./ui/button";
import { Input } from "./ui/input";

const WriteMessage = () => {
  return (
    <div className="fixed flex bg-white py-2 bottom-0 left-50% w-full max-w-[1250px] -mx-4">
      <Input placeholder="Сообщение" className="rounded-none" />
      <Button className="rounded-none">Отправить сообщение</Button>
    </div>
  );
};

export default WriteMessage;
