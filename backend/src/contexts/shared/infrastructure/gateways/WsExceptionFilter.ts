import { ExecutionContext, HttpException, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsConstants } from '../../domain/WsConstants';

export class WsExceptionFilter {
  private logger: Logger = new Logger(WsExceptionFilter.name);

  public catch(exception: HttpException, host: ExecutionContext) {
    this.logger.error(exception);
    const context = host.switchToWs();
    const client: Socket = context.getClient<Socket>();
    const message = Array.isArray((exception.getResponse() as any).message)
      ? (exception.getResponse() as any).message.join(', ')
      : (exception.getResponse() as any).message ?? exception.message;
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
