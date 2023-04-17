import { Module } from '@nestjs/common';
import { CreateGameGateway } from './gateways/create-game/CreateGameGateway';
import { WsModule } from '../../../contexts/shared/infrastructure/gateways/WsModule';
import { CreateGameCommandHandler } from '../../../contexts/game/application/create/CreateGameCommandHandler';
import { CreateGameAppProvider } from './config/Providers';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [CreateGameCommandHandler];

@Module({
  imports: [WsModule, CqrsModule],
  providers: [...commandHandlers, CreateGameGateway, CreateGameAppProvider],
  exports: [],
})
export class GameModule {}
