import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000, '0.0.0.0', function () {
    console.log('*** Listening to port:  ' + 3000);
    console.log('*** open your browser on http://127.0.0.1:3000/ ***');
  });
}

bootstrap();
