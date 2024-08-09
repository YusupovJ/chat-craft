import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={cn("max-w-[1250px] mx-[auto] h-screen py-4", className)}>{children}</div>;
};

export default Container;
