export class JoinGameCommand {
  constructor(
    public readonly clientId: string,
    public readonly gameId: string,
  ) {}
}
