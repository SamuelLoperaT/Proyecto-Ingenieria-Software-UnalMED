import { ExceptionFilter, ExecutionContext, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsConstants } from '../../domain/WsConstants';

export class WsExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(WsExceptionFilter.name);

  public catch(exception: Error, host: ExecutionContext) {
    this.logger.error(exception);
    const context = host.switchToWs();
    const client: Socket = context.getClient<Socket>();
    const message =
      (Array.isArray((exception as any).response?.message)
        ? (exception as any).response?.message?.join(', ')
        : (exception as any).response?.message) ??
      (Array.isArray(exception.message)
        ? exception.message.join(', ')
        : exception.message);
    console.log(exception);
    client.emit(WsConstants.ERROR_HANDLER, {
      success: false,
      location: host.getClass()?.name,
      message,
      timestamp: new Date().toISOString(),
      path: client.nsp.name,
    });
  }
}
