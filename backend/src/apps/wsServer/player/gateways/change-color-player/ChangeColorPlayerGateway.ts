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
import { WsExceptionFilter } from '../../../../../contexts/shared/infrastructure/gateways/WsExceptionFilter';
import { GeneralGuard } from '../../../../../contexts/shared/application/GeneralGuard';
import { WsServerDecorator } from '../../../../../contexts/shared/infrastructure/gateways/WsServerDecorator';
import { CqrsBase } from '../../../../../contexts/shared/domain/CqrsBase';
import { ChangeColorPlayerGatewayRequest } from './ChangeColorPlayerGatewayRequest';
import { ChangeColorPlayerCommand } from '../../../../../contexts/game/application/change-color-player/ChangeColorPlayerCommand';

@WsServerDecorator()
export class ChangeColorPlayerGateway extends CqrsBase {
  private logger: Logger = new Logger(ChangeColorPlayerGateway.name);
  private static readonly MESSAGE = 'CHANGE_COLOR_PLAYER';

  @SubscribeMessage(ChangeColorPlayerGateway.MESSAGE)
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
    @MessageBody() data: ChangeColorPlayerGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${data.playerId}`);
    await this.dispatch(
      new ChangeColorPlayerCommand(
        data.playerId,
        data.gameId,
        client.id,
        data.color,
      ),
    );
    this.logger.log(`${this.execute.name} Finish`);
  }
}
