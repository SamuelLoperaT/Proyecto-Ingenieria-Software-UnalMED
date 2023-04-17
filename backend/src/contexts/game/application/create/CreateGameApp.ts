import { Logger } from '@nestjs/common';
import { PlayerId } from '../../../players/domain/PlayerId';
import { IWsRepository } from '../../../shared/domain/IWsRepository';
import { Game } from '../../domain/Game';
import { GameId } from '../../domain/GameId';
import { Player } from '../../../players/domain/Player';
import { GameMessagesConstants } from '../../domain/GameMessagesConstants';
import { GameMessagesDataConfig } from '../../domain/GameMessagesData';

export class CreateGameApp {
  private logger: Logger = new Logger(CreateGameApp.name);

  constructor(
    private readonly socketManager: IWsRepository<GameMessagesDataConfig>,
  ) {}

  async execute(playerId: PlayerId) {
    this.logger.log(`[${this.execute.name}] INIT`);
    const game: Game = Game.fromPrimitives({
      gameId: GameId.generate().toString(),
      players: [
        Player.fromPrimitives({ playerId: playerId.toString() }).toPrimitives(),
      ],
    });
    await this.socketManager.addClientToRoom(
      playerId.toString(),
      game.gameId.toString(),
    );
    await this.socketManager.emitToClient(
      playerId.toString(),
      GameMessagesConstants.GAME_CREATED,
      game.toPrimitives(),
    );
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
