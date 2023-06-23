export class ChangeColorPlayerCommand {
  constructor(
    public readonly playerId: string,
    public readonly gameId: string,
    public readonly id: string,
    public readonly color: string,
  ) {}
}
