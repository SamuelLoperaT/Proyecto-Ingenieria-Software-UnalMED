import { ExecutionContext, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsConstants } from '../../domain/WsConstants';

export class WsExceptionFilter {
  private logger: Logger = new Logger(WsExceptionFilter.name);

  public catch(exception: Error, host: ExecutionContext) {
    const context = host.switchToWs();
    const client: Socket = context.getClient<Socket>();
    const message = exception.message;
    client.emit(WsConstants.ERROR_HANDLER, {
      success: false,
      location: host.getClass()?.name,
      message,
      timestamp: new Date().toISOString(),
      path: client.nsp.name,
    });
  }
}
