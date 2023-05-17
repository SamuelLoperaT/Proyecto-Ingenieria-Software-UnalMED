import { Module } from '@nestjs/common';
import { CreateGameGateway } from './gateways/create-game/CreateGameGateway';
import { WsModule } from '../../../contexts/shared/infrastructure/gateways/WsModule';
import { CreateGameCommandHandler } from '../../../contexts/game/application/create/CreateGameCommandHandler';
import { CreateGameAppProvider, JoinGameAppProvider } from './config/Providers';
import { CqrsModule } from '@nestjs/cqrs';
import { JoinGameCommandHandler } from '../../../contexts/game/application/join/JoinGameCommandHandler';
import { JoinGameGateway } from './gateways/join-game/JoinGameGateway';

const commandHandlers = [CreateGameCommandHandler, JoinGameCommandHandler];

@Module({
  imports: [WsModule, CqrsModule],
  providers: [
    ...commandHandlers,
    CreateGameGateway,
    JoinGameGateway,
    JoinGameAppProvider,
    CreateGameAppProvider,
  ],
  exports: [],
})
export class GameModule {}
