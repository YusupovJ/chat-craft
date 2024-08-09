import logo from "../assets/logo.webp";
import Container from "./container";

function Headers() {
  return (
    <div className=" bg-[rgba(255,255,255,1)] backdrop-blur-md p-5 rounded-lg fixed top-0 left-0 right-0">
      <Container className="h-full">
        <div className="flex items-center space-x-5">
          <div className="w-[50px] h-[50px] ">
            <img src={logo} alt="Logo" className="w-[100%] h-[100%] object-cover" />
          </div>
          <h1 className="font-bold text-[18px]">craft-chat</h1>
        </div>
      </Container>
    </div>
  );
}

export default Headers;
