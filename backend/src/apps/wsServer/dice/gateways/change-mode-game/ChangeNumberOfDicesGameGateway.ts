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
import { ChangeNumberOfDicesGatewayRequest } from './ChangeNumberOfDicesGatewayRequest';
import { ChangeNumberOfDicesCommand } from '../../../../../contexts/dice/application/change-dice-number/ChangeNumberOfDicesCommand';
@WsServerDecorator()
export class ChangeNumberOfDicesGameGateway extends CqrsBase {
  private logger: Logger = new Logger(ChangeNumberOfDicesGameGateway.name);
  private static readonly MESSAGE = 'CHANGE_NUMBER_OF_DICES';

  @SubscribeMessage(ChangeNumberOfDicesGameGateway.MESSAGE)
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
    @MessageBody() data: ChangeNumberOfDicesGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${data.playerId}`);
    await this.dispatch(
      new ChangeNumberOfDicesCommand(
        data.playerId,
        data.gameId,
        client.id,
        data.numberOfDices,
      ),
    );
    this.logger.log(`${this.execute.name} Finish`);
  }
}
