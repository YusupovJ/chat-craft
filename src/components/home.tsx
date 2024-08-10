import Container from "./container";
import steve from "../assets/minecraft-realms-minecraft-6.png";
import { Button } from "./ui/button";
import { GitPullRequestCreateArrow } from "lucide-react";
import { Input } from "./ui/input";
import bgImage from "../assets/bg-main.jpg";
import Headers from "./headers";

const Home = () => {
  return (
    <>
      <img
        src={bgImage}
        loading="lazy"
        alt="img"
        className="absolute top-0 left-0 w-full h-full z-[-1] sepia-[60%] object-cover"
      />
      <Headers />
      <Container className="justify-center content-center">
        <div className=" flex items-center justify-between gap-5">
          <div className="max-w-[600px] bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-5 rounded-lg">
            <h1 className="font-bold text-3xl text-gray-200">
              Добро пожаловать в craft-chat место, где встречаются люди со всего мира!
            </h1>
            <p className="my-5 text-gray-200">
              Здесь вы можете общаться с друзьями, заводить новые знакомства, делиться мыслями и идеями. Наш чат открыт
              для всех, независимо от возраста, интересов или местоположения. Присоединяйтесь к нам и станьте частью
              глобального сообщества, где каждый голос важен!
            </p>
            <div className="flex space-x-5">
              <Button>
                <GitPullRequestCreateArrow />
                <p className="ml-5">Cоздать</p>
              </Button>
              <div className="flex space-x-1 w-full">
                <Input placeholder="Поиск встречи" autoComplete="false" />
                <Button>поиск</Button>
              </div>
            </div>
          </div>
          <div className="max-w-[500px] animate-[wiggle_9s_ease-in-out_infinite] ">
            <img className="animate-[zoom_1s_ease-in-out_1] origin-bottom-left" src={steve} width="100%" alt="steve" />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
