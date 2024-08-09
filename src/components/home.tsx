import Container from "./container";
import logo from "../assets/logo.webp";
import steve from "../assets/minecraft-realms-minecraft-6.png";
import { Button } from "./ui/button";
import { GitPullRequestCreateArrow } from "lucide-react";
import { Input } from "./ui/input";

const Home = () => {
  return (
    <Container>
      <div className="flex items-center space-x-5">
        <div className="w-[50px] h-[50px]">
          <img src={logo} alt="Logo" className="w-[100%] h-[100%] object-cover" />
        </div>
        <h1 className="font-bold text-[18px]">craft-chat</h1>
      </div>
      <div className="h-[95%] flex items-center justify-between">
        <div className="max-w-[600px]">
          <h1 className="font-bold text-3xl">
            Добро пожаловать в craft-chat место, где встречаются люди со всего мира!
          </h1>
          <p className="my-5">
            Здесь вы можете общаться с друзьями, заводить новые знакомства, делиться мыслями и идеями. Наш чат открыт
            для всех, независимо от возраста, интересов или местоположения. Присоединяйтесь к нам и станьте частью
            глобального сообщества, где каждый голос важен!
          </p>
          <div className="flex space-x-5">
            <Button>
              <GitPullRequestCreateArrow />
              <p className="ml-5">Cоздать</p>
            </Button>
            <Input placeholder="Поиск встречи" autoComplete="false" />
          </div>
        </div>
        <div className="max-w-[400px] animate-[wiggle_2s_ease-in-out_infinite] ">
          <img src={steve} width="100%" alt="steve" />
        </div>
      </div>
    </Container>
  );
};

export default Home;
