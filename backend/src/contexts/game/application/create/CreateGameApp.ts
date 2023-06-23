import { Logger } from '@nestjs/common';
import { PlayerId } from '../../../players/domain/PlayerId';
import { IWsRepository } from '../../../shared/domain/IWsRepository';
import { Game } from '../../domain/Game';
import { GameId } from '../../domain/GameId';
import { Player } from '../../../players/domain/Player';
import { GameMessagesConstants } from '../../domain/GameMessagesConstants';
import { GameMessagesDataConfig } from '../../domain/GameMessagesData';
import { ClientId } from '../../../players/domain/ClientId';
import { ColorConstants } from '../../../shared/domain/ColorConstants';
import { PlayerStatusConstants } from '../../../players/domain/PlayerStatusConstants';
import { GameStatusConstants } from '../../domain/GameStatusConstants';
import { GameTypesConstants } from '../../domain/GameTypesConstants';

export class CreateGameApp {
  private logger: Logger = new Logger(CreateGameApp.name);

  constructor(
    private readonly socketManager: IWsRepository<GameMessagesDataConfig>,
  ) {}

  async execute(playerId: PlayerId, clientId: ClientId): Promise<void> {
    this.logger.log(`[${this.execute.name}] INIT`);
    const colors = Object.values(ColorConstants);
    const selectedColor = colors.splice(
      Math.floor(Math.random() * colors.length),
      1,
    );
    const game: Game = Game.fromPrimitives({
      gameId: GameId.generate().toString(),
      players: [
        Player.fromPrimitives({
          playerId: playerId.toString(),
          catchCount: 0,
          clientId: clientId.toString(),
          color: selectedColor[0],
          host: true,
          ladder: [],
          penalties: 0,
          status: PlayerStatusConstants.INACTIVE,
          tabs: [],
          tabsAvailable: 0,
          lastTabsMoved: [],
        }).toPrimitives(),
      ],
      dices: [],
      numberOfDices: 2,
      numberOfTabs: 4,
      availableColors: colors,
      status: GameStatusConstants.PENDING,
      winners: [],
      board: null,
      type: GameTypesConstants.STANDARD,
    });
    await this.socketManager.addClientToRoom(
      clientId.toString(),
      game.gameId.toString(),
    );
    await this.socketManager.emitToClient(
      clientId.toString(),
      GameMessagesConstants.GAME_CREATED,
      game.toPrimitives(),
    );
    this.logger.log(`[${this.execute.name}] FINISH`);
  }
}
