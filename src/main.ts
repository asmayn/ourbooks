import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //if it needs validation
  
  const config = new DocumentBuilder()
    .setTitle("ourbooks API")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("", app, document)

  await app.listen(3000);
}
bootstrap();
