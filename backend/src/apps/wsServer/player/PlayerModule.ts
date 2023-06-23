import { Module } from '@nestjs/common';
import { WsModule } from '../../../contexts/shared/infrastructure/gateways/WsModule';
import { CqrsModule } from '@nestjs/cqrs';
import { PlayerLeaveGateway } from './gateways/player-leave/PlayerLeaveGateway';
import { PlayerRejoinGateway } from './gateways/player-rejoin/PlayerRejoinGateway';

const commandHandlers = [];

@Module({
  imports: [WsModule, CqrsModule],
  providers: [...commandHandlers, PlayerLeaveGateway, PlayerRejoinGateway],
  exports: [],
})
export class PlayerModule {}
