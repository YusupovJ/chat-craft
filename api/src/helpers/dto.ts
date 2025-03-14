import { IsNumberString, IsOptional, IsString } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}

export class SearchDto {
  @IsOptional()
  @IsString()
  search: string;
}

export class GetMessagesDto extends PaginationDto {
  @IsString()
  chatId: string;
}
