export class ThrowDicesCommand {
  constructor(
    public readonly playerId: string,
    public readonly gameId: string,
    public readonly id: string,
  ) {}
}
