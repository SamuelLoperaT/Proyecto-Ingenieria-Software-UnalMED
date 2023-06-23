export class ChangeNumberOfDicesCommand {
  constructor(
    public readonly playerId: string,
    public readonly gameId: string,
    public readonly id: string,
    public readonly numberOfDices: number,
  ) {}
}
