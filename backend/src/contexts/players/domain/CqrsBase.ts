import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CqrsBase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  protected async dispatch(command): Promise<any> {
    return this.commandBus.execute(command);
  }

  protected async query(command): Promise<any> {
    return this.queryBus.execute(command);
  }
}
