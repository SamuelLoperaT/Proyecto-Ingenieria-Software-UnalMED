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
import { CreateGameCommand } from '../../../../../contexts/game/application/create/CreateGameCommand';
import { CreateGameGatewayRequest } from './CreateGameGatewayRequest';

@WsServerDecorator()
export class CreateGameGateway extends CqrsBase {
  private logger: Logger = new Logger(CreateGameGateway.name);
  private static readonly MESSAGE = 'CREATE_GAME';

  @SubscribeMessage(CreateGameGateway.MESSAGE)
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
    @MessageBody() data: CreateGameGatewayRequest,
  ) {
    this.logger.log(`${this.execute.name} Init client:: ${data.playerId}`);
    await this.dispatch(new CreateGameCommand(data.playerId, client.id));
    this.logger.log(`${this.execute.name} Finish`);
  }
}
