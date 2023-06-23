import { PlayerId } from '../../domain/PlayerId';

export class PlayerRejoinCommand {
  constructor(
    public readonly clientId: string,
    public readonly playerId: string,
  ) {}
}
