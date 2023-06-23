import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ChangeModeGameGatewayRequest {
  @IsUUID(4, { message: 'player id format not valid' })
  @IsString({ message: 'player id must be a string' })
  @IsNotEmpty({ message: 'player id is required' })
  playerId: string;

  @IsUUID(4, { message: 'game id format not valid' })
  @IsString({ message: 'game id must be a string' })
  @IsNotEmpty({ message: 'game id is required' })
  gameId: string;

  @IsString({ message: 'game type must be a string' })
  @IsNotEmpty({ message: 'game type is required' })
  gameType: string;
}
