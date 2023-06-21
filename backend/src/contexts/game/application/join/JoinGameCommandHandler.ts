import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JoinGameCommand } from './JoinGameCommand';
import { JoinGameApp } from './JoinGameApp';
import { PlayerId } from '../../../players/domain/PlayerId';
import { Logger } from '@nestjs/common';
import { CreateGameCommandHandler } from '../create/CreateGameCommandHandler';
import { GameId } from '../../domain/GameId';
import { ClientId } from '../../../players/domain/ClientId';

@CommandHandler(JoinGameCommand)
export class JoinGameCommandHandler
  implements ICommandHandler<JoinGameCommand>
{
  private logger: Logger = new Logger(CreateGameCommandHandler.name);

  constructor(public readonly joinGameApp: JoinGameApp) {}

  async execute(command: JoinGameCommand): Promise<any> {
    this.logger.log(`[${this.execute.name}] INIT`);
    await this.joinGameApp.execute(
      new PlayerId(command.playerId),
      new GameId(command.gameId),
      new ClientId(command.clientId),
    );
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
