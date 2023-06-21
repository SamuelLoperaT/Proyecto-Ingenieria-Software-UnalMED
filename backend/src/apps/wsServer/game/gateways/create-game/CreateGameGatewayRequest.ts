import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateGameGatewayRequest {
  @IsUUID(4, { message: 'player id format not valid' })
  @IsString({ message: 'player id must be a string' })
  @IsNotEmpty({ message: 'player id is required' })
  playerId: string;
}
