export class ChangeModeGameCommand {
  constructor(
    public readonly playerId: string,
    public readonly gameId: string,
    public readonly id: string,
    public readonly gameType: string,
  ) {}
}
