import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('MAIN');

async function bootstrap() {
  logger.log(`[${bootstrap.name}] INIT`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(Number(process.env.PORT));
  logger.log(
    `[${bootstrap.name}] FINISHED, SERVER RUNNING in ${await app.getUrl()}`,
  );
}

bootstrap();
