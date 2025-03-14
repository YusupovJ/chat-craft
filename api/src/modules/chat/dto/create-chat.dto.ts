import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateChatDto {
  @IsString()
  @ApiProperty()
  @MinLength(2)
  name: string;

  @IsString()
  @ApiProperty()
  img: string;
}
