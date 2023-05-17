import { Logger } from '@nestjs/common';
import { PlayerId } from '../../../players/domain/PlayerId';
import { IWsRepository } from '../../../shared/domain/IWsRepository';
import { Game } from '../../domain/Game';
import { GameId } from '../../domain/GameId';
import { Player } from '../../../players/domain/Player';
import { GameMessagesConstants } from '../../domain/GameMessagesConstants';
import { GameMessagesDataConfig } from '../../domain/GameMessagesData';

export class JoinGameApp {
  private logger: Logger = new Logger(JoinGameApp.name);

  constructor(
    private readonly socketManager: IWsRepository<GameMessagesDataConfig>,
  ) {}

  async execute(playerId: PlayerId, gameId: GameId) {
    this.logger.log(`[${this.execute.name}] INIT`);
    const game = Game.games.find(
      (g) => g.gameId.toString() === gameId.toString(),
    );
    if (!game) {
      throw new Error('GAME NOT FOUND');
    }
    if (
      Game.games.some((g) =>
        g.players.some((p) => p.playerId.toString() === playerId.toString()),
      )
    ) {
      throw new Error('PLAYER ALREADY IN GAME');
    }
    game.players.push(Player.fromPrimitives({ playerId: playerId.toString() }));
    await this.socketManager.addClientToRoom(
      playerId.toString(),
      game.gameId.toString(),
    );
    await this.socketManager.emitToRoom(
      gameId.toString(),
      GameMessagesConstants.USER_JOINED,
      game.toPrimitives(),
    );
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
