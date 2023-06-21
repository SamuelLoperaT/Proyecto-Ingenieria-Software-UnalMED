import { FactoryProvider } from '@nestjs/common';
import { CreateGameApp } from '../../../../contexts/game/application/create/CreateGameApp';
import { IWsRepository } from '../../../../contexts/shared/domain/IWsRepository';
import { GameMessagesDataConfig } from '../../../../contexts/game/domain/GameMessagesData';
import { WsMainGateway } from '../../../../contexts/shared/infrastructure/gateways/WsMainGateway';
import { JoinGameApp } from '../../../../contexts/game/application/join/JoinGameApp';

export const CreateGameAppProvider: FactoryProvider<CreateGameApp> = {
  inject: [WsMainGateway],
  provide: CreateGameApp,

  useFactory: (
    socketManager: IWsRepository<GameMessagesDataConfig>,
  ): CreateGameApp => {
    return new CreateGameApp(socketManager);
  },
};
export const JoinGameAppProvider: FactoryProvider<JoinGameApp> = {
  inject: [WsMainGateway],
  provide: JoinGameApp,

  useFactory: (
    socketManager: IWsRepository<GameMessagesDataConfig>,
  ): JoinGameApp => {
    return new JoinGameApp(socketManager);
  },
};
