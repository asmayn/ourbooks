import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //if it needs validation
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.setGlobalPrefix('/api/v1')

  const config = new DocumentBuilder()
    .setTitle("Ourbooks API")
    .addBearerAuth()
    .setBasePath('/api/v1')
    .build()
  const document = SwaggerModule.createDocument(app, config); //json
  SwaggerModule.setup("", app, document)
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
