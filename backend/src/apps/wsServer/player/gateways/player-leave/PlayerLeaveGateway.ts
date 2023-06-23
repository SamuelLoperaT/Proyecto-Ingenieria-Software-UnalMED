import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsServerDecorator } from '../../../../../contexts/shared/infrastructure/gateways/WsServerDecorator';
import { CqrsBase } from '../../../../../contexts/shared/domain/CqrsBase';
import { PlayerLeaveCommand } from '../../../../../contexts/players/application/player-leave/PlayerLeaveCommand';

@WsServerDecorator()
export class PlayerLeaveGateway
  extends CqrsBase
  implements OnGatewayDisconnect
{
  private logger: Logger = new Logger(PlayerLeaveGateway.name);

  async handleDisconnect(client: Socket) {
    this.logger.log(`${this.handleDisconnect.name} Init client:: ${client.id}`);
    await this.dispatch(new PlayerLeaveCommand(client.id));
    this.logger.log(`${this.handleDisconnect.name} Finish`);
  }
}
