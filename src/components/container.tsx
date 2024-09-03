import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={cn("max-w-[1250px] mx-[auto] p-2 w-full", className)}>{children}</div>;
};

export default Container;
