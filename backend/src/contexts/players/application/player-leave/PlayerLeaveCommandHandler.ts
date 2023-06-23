import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlayerLeaveCommand } from './PlayerLeaveCommand';
import { Logger } from '@nestjs/common';
import { ClientId } from '../../domain/ClientId';
import { PlayerLeaveApp } from './PlayerLeaveApp';

@CommandHandler(PlayerLeaveCommand)
export class PlayerLeaveCommandHandler
  implements ICommandHandler<PlayerLeaveCommand>
{
  private readonly logger: Logger = new Logger(PlayerLeaveCommandHandler.name);

  constructor(private readonly leavePlayerApp: PlayerLeaveApp) {}

  async execute(command: PlayerLeaveCommand): Promise<void> {
    this.logger.log(`[${this.execute.name}] INIT`);
    await this.leavePlayerApp.execute(new ClientId(command.clientId));
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
