import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 bg-background z-50 w-full h-full">
      <Loader2
        width={100}
        height={100}
        className="fixed top-[calc(50%-50px)] left-[calc(50%-50px)] stroke-primary animate-spin"
      />
    </div>
  );
};
