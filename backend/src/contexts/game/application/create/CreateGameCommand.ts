export class CreateGameCommand {
  constructor(
    public readonly playerId: string,
    public readonly clientId: string,
  ) {}
}
