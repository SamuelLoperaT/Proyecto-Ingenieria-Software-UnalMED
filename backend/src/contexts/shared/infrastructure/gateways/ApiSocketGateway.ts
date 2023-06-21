import { Logger } from '@nestjs/common';
import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';

export abstract class ApiSocketGateway
  implements OnGatewayInit, OnGatewayInit, OnGatewayDisconnect
{
  protected abstract logger: Logger;

  async afterInit(server: Socket): Promise<void> {
    this.logger.log(`[${this.afterInit.name}] socket started`);
  }

  async handleConnection(client: Socket): Promise<void> {
    await this.connectionEvent(client, client.handshake.query);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    await this.disconnectionEvent(client, client.handshake.query);
  }

  protected async connectionEvent(client?: Socket, query?: any) {
    this.logger.log(`[${this.handleConnection.name}] User connected.`);
  }

  protected async disconnectionEvent(client?: Socket, query?: any) {
    this.logger.log(`[${this.handleDisconnect.name}] User disconnected.`);
  }
}
