import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class JoinGameGatewayRequest {
  @IsUUID(4, { message: 'game id format not valid' })
  @IsString({ message: 'game id must be a string' })
  @IsNotEmpty({ message: 'game id is required' })
  gameId: string;
}
