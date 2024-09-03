import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IMessage } from "@/types";

export const fetchMessages = async (id?: string, page: number = 1) => {
  const response = await api.get<IMessage[]>(urls.message.getAll(id, page));
  return response.data;
};
