import Container from "./container";
import Logo from "../assets/logo.svg?react";

function Headers() {
  return (
    <div className=" bg-[rgb(22,163,74)] backdrop-blur-md p-5 rounded-lg fixed top-0 left-0 right-0">
      <Container className="h-full">
        <div className="flex items-center space-x-5">
          <Logo />
          <h1 className="font-bold text-white text-[18px]">Craft_Chat</h1>
        </div>
      </Container>
    </div>
  );
}

export default Headers;
