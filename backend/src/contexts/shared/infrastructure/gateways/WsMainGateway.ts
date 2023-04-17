import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ApiSocketGateway } from './ApiSocketGateway';
import { WsServerDecorator } from './WsServerDecorator';
import { IWsRepository } from '../../domain/IWsRepository';
import { MessagesData } from '../../domain/MessagesData';

@WsServerDecorator()
export class WsMainGateway
  extends ApiSocketGateway
  implements IWsRepository<any>
{
  @WebSocketServer() private wsServer: Server;
  logger: Logger = new Logger(WsMainGateway.name);

  async addClientToRoom(clientId: string, roomName: string): Promise<void> {
    this.logger.log(
      `[${this.addClientToRoom.name}] INIT - ${JSON.stringify({
        clientId,
        roomName,
      })}`,
    );
    this.wsServer.to(clientId).socketsJoin(roomName);
    this.logger.log(`[${this.addClientToRoom.name}] FINISH`);
  }

  async emitToClient<T extends keyof any>(
    clientId: string,
    event: T,
    message: MessagesData<any, T>,
  ): Promise<void> {
    this.logger.log(
      `[${this.emitToClient.name}] INIT - ${JSON.stringify({
        clientId,
        event,
      })}`,
    );
    this.wsServer.to(clientId).emit(event.toString(), message);
    this.logger.log(`[${this.emitToClient.name}] FINISH`);
  }

  async emitToRoom<T extends keyof any>(
    roomName: string,
    event: T,
    message: MessagesData<any, T>,
  ): Promise<void> {
    this.logger.log(
      `[${this.emitToClient.name}] INIT - ${JSON.stringify({
        roomName,
        event,
      })}`,
    );
    this.wsServer.to(roomName).emit(event.toString(), message);
    this.logger.log(`[${this.emitToClient.name}] FINISH`);
  }

  async removeClientFromRoom(clientId: string, roomName: string): Promise<void> {
    this.logger.log(
      `[${this.addClientToRoom.name}] INIT - ${JSON.stringify({
        clientId,
        roomName,
      })}`,
    );
    this.wsServer.to(clientId).socketsLeave(roomName);
    this.logger.log(`[${this.addClientToRoom.name}] FINISH`);
  }
}
