import { MessagesData } from './MessagesData';

export interface IWsRepository<DataConfig> {
  emitToRoom<T extends keyof DataConfig>(
    roomName: string,
    event: T,
    message: MessagesData<DataConfig, T>,
  ): Promise<void>;

  emitToClient<T extends keyof DataConfig>(
    clientId: string,
    event: T,
    message: MessagesData<DataConfig, T>,
  ): Promise<void>;

  addClientToRoom(clientId: string, roomName: string): Promise<void>;

  removeClientFromRoom(clientId: string, roomName: string): Promise<void>;
}
