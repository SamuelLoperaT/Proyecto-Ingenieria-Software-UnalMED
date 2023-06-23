import { Module } from '@nestjs/common';
import { ThrowDicesGateway } from './gateways/create-game/ThrowDicesGateway';
import { WsModule } from '../../../contexts/shared/infrastructure/gateways/WsModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ChangeNumberOfDicesGameGateway } from './gateways/change-mode-game/ChangeNumberOfDicesGameGateway';

const commandHandlers = [];

@Module({
  imports: [WsModule, CqrsModule],
  providers: [
    ...commandHandlers,
    ChangeNumberOfDicesGameGateway,
    ThrowDicesGateway,
  ],
  exports: [],
})
export class DiceModule {}
