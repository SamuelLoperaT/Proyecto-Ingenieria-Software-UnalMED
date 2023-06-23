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
import { ThrowDicesGatewayRequest } from './ThrowDicesGatewayRequest';
import { ThrowDicesCommand } from '../../../../../contexts/dice/application/throw-dices/ThrowDicesCommand';

@WsServerDecorator()
export class ThrowDicesGateway extends CqrsBase {
  private logger: Logger = new Logger(ThrowDicesGateway.name);
  private static readonly MESSAGE = 'THROW_DICES';

  @SubscribeMessage(ThrowDicesGateway.MESSAGE)
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
    @MessageBody() data: ThrowDicesGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${data.playerId}`);
    await this.dispatch(
      new ThrowDicesCommand(data.playerId, data.gameId, client.id),
    );
    this.logger.log(`${this.execute.name} Finish`);
  }
}
