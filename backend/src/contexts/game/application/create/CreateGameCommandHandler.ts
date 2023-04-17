import { CreateGameCommand } from './CreateGameCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateGameApp } from './CreateGameApp';
import { PlayerId } from '../../../players/domain/PlayerId';

@CommandHandler(CreateGameCommand)
export class CreateGameCommandHandler
  implements ICommandHandler<CreateGameCommand>
{
  private logger: Logger = new Logger(CreateGameCommandHandler.name);

  constructor(private readonly createGameApp: CreateGameApp) {}

  async execute(command: CreateGameCommand): Promise<void> {
    this.logger.log(`[${this.execute.name}] INIT`);
    await this.createGameApp.execute(new PlayerId(command.clientId));
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
