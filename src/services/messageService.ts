import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IMessage, IMessagePage } from "@/types";
import { QueryFunction, QueryKey } from "react-query";

export const fetchMessages: QueryFunction<IMessagePage, QueryKey> = async ({ queryKey, pageParam = 1 }) => {
  const id = String(queryKey[1]);
  const response = await api.get<IMessage[]>(urls.message.getAll(id, pageParam || 1));

  return {
    messages: response.data,
    nextPage: pageParam + 1 <= Number(response.pagination?.totalPages) ? pageParam + 1 : undefined,
    totalPages: response.pagination?.totalPages || 1,
  };
};
