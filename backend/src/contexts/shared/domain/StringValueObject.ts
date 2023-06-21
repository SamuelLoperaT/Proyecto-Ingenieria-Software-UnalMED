export abstract class StringValueObject {
  constructor(protected value: string) {}

  toString(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}
