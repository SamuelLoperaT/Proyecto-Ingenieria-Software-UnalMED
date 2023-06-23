import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import {
  HttpStatus,
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsServerDecorator } from '../../../../../contexts/shared/infrastructure/gateways/WsServerDecorator';
import { CqrsBase } from '../../../../../contexts/shared/domain/CqrsBase';
import { PlayerRejoinCommand } from '../../../../../contexts/players/application/player-rejoin/PlayerRejoinCommand';
import { WsExceptionFilter } from '../../../../../contexts/shared/infrastructure/gateways/WsExceptionFilter';
import { GeneralGuard } from '../../../../../contexts/shared/application/GeneralGuard';
import { PlayerRejoinGatewayRequest } from './PlayerRejoinGatewayRequest';

@WsServerDecorator()
export class PlayerRejoinGateway extends CqrsBase {
  private static message = 'REJOIN_GAME';
  private logger: Logger = new Logger(PlayerRejoinGateway.name);

  @SubscribeMessage(PlayerRejoinGateway.message)
  @UseFilters(WsExceptionFilter)
  @UseGuards(GeneralGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  )
  async execute(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PlayerRejoinGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${client.id}`);
    await this.dispatch(new PlayerRejoinCommand(client.id, data.playerId));
    this.logger.log(`${this.execute.name} Finish`);
  }
}
