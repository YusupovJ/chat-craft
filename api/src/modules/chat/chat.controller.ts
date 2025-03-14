import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { ApiResponse } from "src/helpers/apiResponse";
import { PaginationDto } from "src/helpers/dto";
import { AuthGuard } from "src/helpers/authGuard";
import { IRequest } from "src/helpers/types";
import { ApiTags } from "@nestjs/swagger";

@Controller("chat")
@ApiTags("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createChatDto: CreateChatDto, @Req() req: IRequest) {
    const savedChat = await this.chatService.create(createChatDto, req.userId);
    return new ApiResponse(savedChat, 201);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query: PaginationDto, @Req() req: IRequest) {
    const { chats, pagination } = await this.chatService.findAll(query, req.userId);
    return new ApiResponse(chats, 200, pagination);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const chat = await this.chatService.findOne(id);
    return new ApiResponse(chat);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateChatDto: UpdateChatDto) {
    const updatedChat = await this.chatService.update(id, updateChatDto);
    return new ApiResponse(updatedChat, 201);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.chatService.remove(id);
    return new ApiResponse(`Чат ${id} удален`);
  }
}
