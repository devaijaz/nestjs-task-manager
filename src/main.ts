import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.use(
    cors({
      origin: '*',
    }),
  );
  app.use(helmet());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
