import { Logger } from '@nestjs/common';
import { PlayerId } from '../../../players/domain/PlayerId';
import { IWsRepository } from '../../../shared/domain/IWsRepository';
import { Game } from '../../domain/Game';
import { GameId } from '../../domain/GameId';
import { Player } from '../../../players/domain/Player';
import { GameMessagesConstants } from '../../domain/GameMessagesConstants';
import { GameMessagesDataConfig } from '../../domain/GameMessagesData';
import { ClientId } from '../../../players/domain/ClientId';
import { PlayerStatusConstants } from '../../../players/domain/PlayerStatusConstants';
import { ColorConstants } from '../../../shared/domain/ColorConstants';

export class JoinGameApp {
  private logger: Logger = new Logger(JoinGameApp.name);

  constructor(
    private readonly socketManager: IWsRepository<GameMessagesDataConfig>,
  ) {}

  async execute(playerId: PlayerId, gameId: GameId, clientId: ClientId) {
    this.logger.log(`[${this.execute.name}] INIT`);
    const game = Game.games.get(gameId.toString());
    if (!game) {
      throw new Error('GAME NOT FOUND');
    }
    if (
      new Array(...Game.games.values()).some((g) =>
        g.players.some((p) => p.playerId.toString() === playerId.toString()),
      )
    ) {
      throw new Error('PLAYER ALREADY IN GAME');
    }
    const selectedColor = game.availableColors.splice(
      Math.floor(game.availableColors.length * Math.random()),
      1,
    );
    game.players.push(
      Player.fromPrimitives({
        catchCount: 0,
        clientId: clientId.toString(),
        color: selectedColor[0].toString() as ColorConstants,
        host: false,
        ladder: [],
        penalties: 0,
        status: PlayerStatusConstants.INACTIVE,
        tabs: [],
        tabsAvailable: 0,
        playerId: playerId.toString(),
        lastTabsMoved: [],
      }),
    );
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
