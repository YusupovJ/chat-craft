import { Blob } from "buffer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MessageTypeEnum } from "src/helpers/enums";

class RootDto {
  @IsString()
  chatId: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  replyId?: number;

  @IsEnum(MessageTypeEnum)
  @IsOptional()
  type: MessageTypeEnum;
}

export class CreateMessageDto extends RootDto {
  @IsString()
  content: string;
}

export class CreateVoiceDto extends RootDto {
  @IsString()
  audioBlob: Buffer;
}

export class CreateImageDto extends RootDto {
  @IsString()
  images: string[];
}
