import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { envConfig } from "./config/env.config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("chat-craft-api")
    .setDescription("minimal desc for chat-craft")
    .setVersion("1.0")
    .addTag("chat")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(envConfig.port);
  console.log(`🚀🚀🚀 Listening on port ${envConfig.port} 🚀🚀🚀`);
}

bootstrap();
