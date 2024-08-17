import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api";
import { removeToken } from "@/lib/tokens";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { ChevronDown } from "lucide-react";

export function DropdownMenuRadioGroupDemo({ name }: { name: string | undefined }) {
  const updateAccessToken = useAuthStore((state) => state.updateAccessToken);
  const updateRefreshToken = useAuthStore((state) => state.updateRefreshToken);

  const handelLogout = async () => {
    try {
      await api.post(`${urls.auth.logout}`);
      removeToken();
      updateAccessToken(undefined);
      updateRefreshToken(undefined);
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
