import { TError } from "@/types";
import { toast } from "sonner";

export const onError = (error: TError) => {
  toast.error(error.response?.data.message || "Непредвиденная ошибка");
};
