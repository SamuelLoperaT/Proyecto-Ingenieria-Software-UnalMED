import { DomainRoot } from '../../shared/domain/DomainRoot';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { DiceDto } from './DiceDto';

export class Dice extends DomainRoot<DiceDto> implements ParamsOf<DiceDto> {
  public readonly sides: number;
  public readonly thrown: boolean;
  public readonly value: number;

  constructor(sides: number, thrown: boolean, value: number) {
    super();
    this.sides = sides;
    this.thrown = thrown;
    this.value = value;
  }

  public toPrimitives(): DiceDto {
    return {
      sides: this.sides,
      thrown: this.thrown,
      value: this.value,
    };
  }

  static fromPrimitives(primitives: DiceDto): Dice {
    return new Dice(primitives.sides, primitives.thrown, primitives.value);
  }
}
