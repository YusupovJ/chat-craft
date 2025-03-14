import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EnumGender } from "src/helpers/enums";

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ enum: EnumGender, description: "role user" })
  @IsEnum(EnumGender)
  @IsOptional()
  gender: EnumGender;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  token: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  avatar: number;
}
