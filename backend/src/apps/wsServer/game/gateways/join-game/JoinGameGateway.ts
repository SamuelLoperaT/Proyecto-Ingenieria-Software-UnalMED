import { ConnectedSocket, MessageBody, SubscribeMessage } from "@nestjs/websockets";
import {
  HttpStatus,
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsExceptionFilter } from '../../../../../contexts/shared/infrastructure/gateways/WsExceptionFilter';
import { GeneralGuard } from '../../../../../contexts/shared/application/GeneralGuard';
import { WsServerDecorator } from '../../../../../contexts/shared/infrastructure/gateways/WsServerDecorator';
import { CqrsBase } from '../../../../../contexts/players/domain/CqrsBase';
import { JoinGameCommand } from '../../../../../contexts/game/application/join/JoinGameCommand';
import { JoinGameGatewayRequest } from './JoinGameGatewayRequest';

@WsServerDecorator()
export class JoinGameGateway extends CqrsBase {
  private logger: Logger = new Logger(JoinGameGateway.name);
  private static readonly MESSAGE = 'JOIN_GAME';

  @SubscribeMessage(JoinGameGateway.MESSAGE)
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
    @MessageBody() data: JoinGameGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${client.id}`);
    await this.dispatch(new JoinGameCommand(client.id, data.gameId));
    this.logger.log(`${this.execute.name} Finish`);
  }
}
