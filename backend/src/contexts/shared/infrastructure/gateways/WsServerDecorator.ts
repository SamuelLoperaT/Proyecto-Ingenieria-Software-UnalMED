import { WebSocketGateway } from '@nestjs/websockets';
import { WsConstants } from '../../domain/WsConstants';

export function WsServerDecorator() {
  return WebSocketGateway({
    namespace: WsConstants.NAMESPACE,
    cors: true,
  });
}
