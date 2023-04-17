import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { CryptoUtils } from '../infrastructure/crypt-ts/CryptoUtils';

@Injectable()
export class GeneralGuard implements CanActivate {
  private logger: Logger = new Logger(GeneralGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(`${this.canActivate.name} Init`);
    const { sign } = context.switchToWs().getData();
    const client: Socket = context.switchToWs().getClient<Socket>();
    let response: boolean;
    if (Number(process.env.VALIDATE_MESSAGES) === 0) {
      response = true;
    } else {
      const toCompare = await CryptoUtils.hash(
        process.env.AUTHENTICATION_SECRET,
        undefined,
        client.id,
      );
      response = toCompare === sign;
    }
    this.logger.log(`${this.canActivate.name} Init response : ${response}`);
    return response;
  }
}
