import "axios";
import { IPagination } from ".";

declare module "axios" {
  export interface AxiosResponse<T = any> {
    data: T;
    date: string;
    pagination: IPagination | null;
    status: number;
  }
}

declare module "react-query" {
  interface UseQueryResult<TData> {
    data: TData;
  }
}
