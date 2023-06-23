import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ChangeNumberOfDicesGatewayRequest {
  @IsUUID(4, { message: 'player id format not valid' })
  @IsString({ message: 'player id must be a string' })
  @IsNotEmpty({ message: 'player id is required' })
  playerId: string;

  @IsUUID(4, { message: 'game id format not valid' })
  @IsString({ message: 'game id must be a string' })
  @IsNotEmpty({ message: 'game id is required' })
  gameId: string;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'number of dices must be a number' },
  )
  @IsNotEmpty({ message: 'number of dices is required' })
  numberOfDices: number;
}
