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
import { ChangeModeGameGatewayRequest } from './ChangeModeGameGatewayRequest';
import { ChangeModeGameCommand } from '../../../../../contexts/game/application/change-mode-game/ChangeModeGameCommand';

@WsServerDecorator()
export class ChangeModeGameGateway extends CqrsBase {
  private logger: Logger = new Logger(ChangeModeGameGateway.name);
  private static readonly MESSAGE = 'CHANGE_MODE_GAME';

  @SubscribeMessage(ChangeModeGameGateway.MESSAGE)
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
    @MessageBody() data: ChangeModeGameGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${data.playerId}`);
    await this.dispatch(
      new ChangeModeGameCommand(
        data.playerId,
        data.gameId,
        client.id,
        data.gameType,
      ),
    );
    this.logger.log(`${this.execute.name} Finish`);
  }
}
