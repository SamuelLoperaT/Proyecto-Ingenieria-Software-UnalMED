import { ThrowDicesGateway } from './ThrowDicesGateway';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateGameApp } from './CreateGameApp';
import { PlayerId } from '../../../players/domain/PlayerId';
import { ClientId } from '../../../players/domain/ClientId';

@CommandHandler(ThrowDicesGateway)
export class CreateGameCommandHandler
  implements ICommandHandler<ThrowDicesGateway>
{
  private logger: Logger = new Logger(CreateGameCommandHandler.name);

  constructor(private readonly createGameApp: CreateGameApp) {}

  async execute(command: ThrowDicesGateway): Promise<void> {
    this.logger.log(`[${this.execute.name}] INIT`);
    await this.createGameApp.execute(
      new PlayerId(command.playerId),
      new ClientId(command.clientId),
    );
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
