export class JoinGameCommand {
  constructor(
    public readonly playerId: string,
    public readonly gameId: string,
    public readonly clientId: string,
  ) {}
}
