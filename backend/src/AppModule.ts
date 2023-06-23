import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WsModule } from './contexts/shared/infrastructure/gateways/WsModule';
import { GameModule } from './apps/wsServer/game/GameModule';
import { CqrsModule } from '@nestjs/cqrs';
import { PlayerModule } from './apps/wsServer/player/PlayerModule';
import { DiceModule } from './apps/wsServer/dice/DiceModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    WsModule,
    GameModule,
    PlayerModule,
    DiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
