import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';

const logger: Logger = new Logger('MAIN');

async function bootstrap() {
  logger.log(`[${bootstrap.name}] INIT`);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );
  app.enableCors();
  await app.listen(Number(process.env.PORT));
  logger.log(
    `[${bootstrap.name}] FINISHED, SERVER RUNNING in ${await app.getUrl()}`,
  );
}

bootstrap();
