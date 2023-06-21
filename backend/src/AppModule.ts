import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WsModule } from './contexts/shared/infrastructure/gateways/WsModule';
import { GameModule } from './apps/wsServer/game/GameModule';
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    WsModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
