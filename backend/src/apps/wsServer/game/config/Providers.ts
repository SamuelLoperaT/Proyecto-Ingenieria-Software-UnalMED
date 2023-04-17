import { FactoryProvider } from '@nestjs/common';
import { CreateGameApp } from '../../../../contexts/game/application/create/CreateGameApp';
import { IWsRepository } from '../../../../contexts/shared/domain/IWsRepository';
import { GameMessagesDataConfig } from '../../../../contexts/game/domain/GameMessagesData';
import { WsMainGateway } from '../../../../contexts/shared/infrastructure/gateways/WsMainGateway';

export const CreateGameAppProvider: FactoryProvider<CreateGameApp> = {
  inject: [WsMainGateway],
  provide: CreateGameApp,

  useFactory: async (
    socketManager: IWsRepository<GameMessagesDataConfig>,
  ): Promise<CreateGameApp> => {
    return new CreateGameApp(socketManager);
  },
};
