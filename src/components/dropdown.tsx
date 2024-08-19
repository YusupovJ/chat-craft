import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api";
import { delLocalStorage } from "@/lib/utils";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { ChevronDown } from "lucide-react";

export function DropdownMenuRadioGroupDemo({ name }: { name: string | undefined }) {
  const { setIsAuthenticated, setUser } = useAuthStore();

  const handelLogout = async () => {
    try {
      await api.post(urls.auth.logout);
      delLocalStorage("accessToken", "refreshToken");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white font-sm text-[12px] lg:text-[16px] border border-white">
          {name || "user"}
          <span className="px-1 py-2">
            <ChevronDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0">
        <DropdownMenuRadioGroup>
          <div
            onClick={handelLogout}
            className="bg-red-600 p-2 focus:bg-red-500 focus:text-gray-50 cursor-pointer text-white text-[12px]"
          >
            <p className="text-center">logout</p>
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
